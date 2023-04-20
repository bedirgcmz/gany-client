import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export const GanyContext = createContext();

const GanyContextProvider = (props) => {
  // Auth0 degiskenler
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  // showItem compınentınde acılacak materyalı tutan state
  const [anMaterial, setAnMaterial] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [subCategoryMaterials, setSubCategoryMaterials] = useState([]);
  const [students, setStudents] = useState([]);
  const [mentorStudents, setMentorStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [mentorsTaskList, setMentorsTaskList] = useState([]);
  const [loginInStudentTasks, setLoginInStudentTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [mentorsGroups, setMentorsGroups] = useState([]);
  const [adminsGroups, setAdminsGroups] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [categories, setCategorys] = useState([]);
  const [subCategories, setSubCategorys] = useState([]);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("Kısa Hikayeler");
  //materyalleri toplu ve tek tek gosterme icin aktif olani takip etme
  const [isActiveMaterialCard, setIsActiveMaterialCard] = useState(true);
  const [isActiveShowItem, setIsActiveShowItem] = useState(false);
  //login olan kullanicinin emailini tutan state
  const [loginInMentorEmail, setLoginInMentor] = useState("");
  const [loginInStudentEmail, setLoginInStudent] = useState("");
  const [loginInAdminEmail, setLoginInAdmin] = useState("");
  //login olan adminin ogrenci ve mentor listesini tutan state'ler
  const [adminsAllStudents, setAdminsAllStudents] = useState("");
  const [adminsAllMentors, setAdminsAllMentors] = useState("");
  //login olan adminin email bilgisi ile data da ki admin objesine ulasma
  const loginInAdmin =
    loginInAdminEmail && admins.find((admin) => admin.email === loginInAdminEmail);
  //login olan mentor email bilgisi ile data da ki mentor objesine ulasma
  const loginInMentor =
    loginInMentorEmail && mentors.find((mentor) => mentor.email === loginInMentorEmail);
  // // login olan mentorun grup listesi
  // const groupList = loginInMentor && groups.filter((group) => group.mentorId === loginInMentor.id);
  //login olan student email bilgisi ile data da ki student objesine ulasma
  const loginInStudent =
    loginInStudentEmail && students.find((student) => student.email === loginInStudentEmail);

  useEffect(() => {
    getMaterials();
    getSubCategoriesMaterials(4);
    getSubCategorys();
    getCategorys();
    getStudents();
    getMentors();
    getAdmins();
    getTasks();
    getGroups();
    getOrganisations();
    checkLoginUser();
  }, [isAuthenticated]);

  /**
   * tum organizasyonlari getirme
   */
  const getOrganisations = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/organisations";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setOrganisations(data);
  };

  /**
   * This function fetch data from json-server
   */
  const getMaterials = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/materials";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setMaterials(data);
  };

  //Bir tane materyalei getirme fetch fonksiyonu
  const getMaterialsById = async (pId) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/materials/${pId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setAnMaterial(data);
    setIsActiveMaterialCard(false);
    setIsActiveShowItem(true);
  };

  //Kullanici ve misafirlerin feedback gonderimi
  const postFeedback = async (pNewMessage) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pNewMessage),
    };
    await fetch(`http://localhost:3001/api/v1/gany/feedbacks`, requestOptions);
    Swal.fire({
      icon: "success",
      title: "Tebrikler",
      text: "Mesajınız bize ulaştı. En kısa sürede size geri bildirim yapılacaktır.",
    });
  };

  //Admın ıcın gelen feedback ler
  const getFeedbacks = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/feedbacks";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setFeedbacks(data);
  };

  // Admin feedback silme
  const deleteFeedback = (pFeedbackId) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Bu işlemi geri alamazsınız!",
      icon: "warning",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, onu sil!",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeFeedback(pFeedbackId);
        Swal.fire("Silindi!", "Geri Bildirim silme işlemi başarılı", "success");
      } else if (result.isDenied) {
        Swal.fire("Geri Bildirim silme işlemini iptal ettiniz!", "", "info");
      }
    });
    const removeFeedback = async (pFeedbackId) => {
      const dataURL = `http://localhost:3001/api/v1/gany/feedbacks/${pFeedbackId}`;
      await fetch(dataURL, { method: "DELETE" });
      getFeedbacks();
    };
  };

  const getCategorys = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/categorys";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setCategorys(data);
  };

  const getSubCategorys = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/subcategorys";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setSubCategorys(data);
  };

  //Materyali task olarak atama (mentor olarak)
  const postAddTask = async (pTaskMaterial, pGroupId, pStudentId) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pTaskMaterial),
      };
      await fetch(
        `http://localhost:3001/api/v1/gany/tasks?groupId=${pGroupId}&studentId=${pStudentId}&mentorId=${loginInMentor.id}`,
        requestOptions
      );
      let timerInterval;
      Swal.fire({
        icon: "success",
        title: "Ödev verdiniz!",
        html: "Bu mesaj <b></b> millisaniye içinde kapanacak.",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } catch (error) {
      alert("İşlem başarısız");
    }
  };
  // tum task'lari getirme
  const getTasks = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/tasks";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setTasks(data);
  };

  // logın olan ogrencıye ait task'lari getirme
  const getLoginInStudentTasks = async (pStudentId) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/tasksstudent?studentId=${pStudentId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setLoginInStudentTasks(data);
  };

  // student task_state bilgisini degistirme
  const updateTask = async (pNewTaskState, pTaskId) => {
    const response = await fetch(`http://localhost:3001/api/v1/gany/tasks/${pTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pNewTaskState),
    });

    await response.json();
    getLoginInStudentTasks();
  };

  // Mentor task silme
  const deleteTask = async (pId) => {
    const dataURL = `http://localhost:3001/api/v1/gany/tasks/${pId}`;
    await fetch(dataURL, { method: "DELETE" });
    getTasks();
  };

  // tum group'lari getirme
  const getGroups = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/groups";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setGroups(data);
  };

  // tum group'lari getirme
  const getMentorsGroups = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/groupsofmentor?mentorId=${loginInMentor.id}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setMentorsGroups(data);
  };

  // tum group'lari getirme
  const getAdminsGroups = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/groupsofadmin?organisationId=${loginInAdmin.organisationId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setAdminsGroups(data);
  };

  //Group'lari organizasyon ve mentor ile olusturma
  const adminPostGroup = (pNewGroup, pOrganisationId, pMentorId) => {
    Swal.fire({
      title: "Yeni bir grup oluşturmak istiyor musunuz?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        createNewGroup(pNewGroup, pOrganisationId, pMentorId);
        Swal.fire("Tebrikler, yeni bir grup oluşturdunuz!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Yeni bir grup oluşturmayi iptal ettiniz!", "", "info");
      }
    });

    const createNewGroup = async (pNewGroup, pOrganisationId, pMentorId) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pNewGroup),
      };
      await fetch(
        `http://localhost:3001/api/v1/gany/groups?organisationId=${pOrganisationId}&mentorId=${pMentorId}`,
        requestOptions
      );
    };
  };

  // tum ogrenci listesini getirme
  const getStudents = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/students";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setStudents(data);
  };

  // Login olan mentore ait ogrenci listesini getirme
  const getMentorStudents = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/studentsmentor?mentorUserName=${loginInMentor.user_name}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setMentorStudents(data);
  };

  /* Ogrenci kendi profile bilgilerini guncelleme */
  const putStudentProfileInfo = async (pNewProfileInfo, pStudentId) => {
    Swal.fire({
      title: "Değişiklikleri kaydetmek  istiyor musun?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        putInfo(pNewProfileInfo, pStudentId);
        Swal.fire("Bilgiler Keydedildi!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bilgiler Kaydedilmedi!", "", "info");
      }
    });

    const putInfo = async (pNewProfileInfo, pStudentId) => {
      const response = await fetch(`http://localhost:3001/api/v1/gany/students/${pStudentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pNewProfileInfo),
      });

      await response.json();
      getStudents();
    };
  };

  // tum ogrenci listesini getirme
  const getMentors = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/mentors";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setMentors(data);
  };

  //Mentore ait task listesini getirme
  const getMentorsTaskList = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/tasksmentor?mentorId=${loginInMentor.id}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setMentorsTaskList(data);
  };

  // tum admin listesini getirme
  const getAdmins = async () => {
    try {
      const MY_URL = "http://localhost:3001/api/v1/gany/admins";
      const response = await fetch(MY_URL);
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.log("Hata Vaaarr", error);
    }
  };

  // Admin profil guncelleme fonksiyonu
  const putAdminProfileInfo = (pNewProfileInfo, pAdminId) => {
    Swal.fire({
      title: "Değişiklikleri kaydetmek  istiyor musun?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        putInfo(pNewProfileInfo, pAdminId);
        Swal.fire("Bilgiler Keydedildi!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bilgiler Kaydedilmedi!", "", "info");
      }
    });

    const putInfo = async (pNewProfileInfo, pAdminId) => {
      const response = await fetch(`http://localhost:3001/api/v1/gany/admins/${pAdminId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pNewProfileInfo),
      });

      await response.json();
      getAdmins();
    };
  };

  //Login olan Admine ait ogrenci listesini getirme
  const getAdminsAllStudents = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/studentsadmin?organisationId=${loginInAdmin.organisationId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setAdminsAllStudents(data);
  };

  //Login olan Admine ait mentor listesini getirme
  const getAdminsAllMentor = async () => {
    const MY_URL = `http://localhost:3001/api/v1/gany/mentorsadmin?organisationId=${loginInAdmin.organisationId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setAdminsAllMentors(data);
  };

  // Admin Ogrenci ekleme (POST student)
  const adminPostStudent = (pNewStudent, pGroupId) => {
    Swal.fire({
      title: "Yeni bir öğrenci eklemek istiyor musunuz?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        createNewStudent(pNewStudent, pGroupId);
        Swal.fire("Tebrikler, yeni bir öğrenci eklediniz!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Yeni bir öğrenci eklemeyi iptal ettiniz!", "", "info");
      }
    });

    const createNewStudent = async (pNewStudent, pGroupId) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pNewStudent),
      };
      await fetch(
        `http://localhost:3001/api/v1/gany/students?groupId=${pGroupId}&organisationId=${loginInAdmin.organisationId}`,
        requestOptions
      );
    };
  };

  // Admin ogrenci silme
  const adminDeleteStudent = async (pStudentId) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Bu işlemi geri alamazsınız!",
      icon: "warning",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, onu sil!",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(pStudentId);
        Swal.fire("Silindi!", "Öğrenci silme işlemi başarılı", "success");
      } else if (result.isDenied) {
        Swal.fire("Öğrenci silme işlemini iptal ettiniz!", "", "info");
      }
    });

    const deleteStudent = async (pStudentId) => {
      const dataURL = `http://localhost:3001/api/v1/gany/students/${pStudentId}`;
      await fetch(dataURL, { method: "DELETE" });
      getStudents();
      getMentorStudents();
    };
  };

  // Admin ogrenci guncelleme
  const adminUpdateStudent = async (pStudentId, pStudentNewInfo) => {
    Swal.fire({
      title: "Değişiklikleri kaydetmek  istiyor musun?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        putInfo(pStudentId, pStudentNewInfo);
        Swal.fire("Bilgiler Keydedildi!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bilgiler Kaydedilmedi!", "", "info");
      }
    });

    const putInfo = async (pStudentId, pStudentNewInfo) => {
      const response = await fetch(`http://localhost:3001/api/v1/gany/students/${pStudentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pStudentNewInfo),
      });

      await response.json();
      getAdminsAllStudents();
    };
  };

  // Admin Mentor ekleme (POST mentor)
  const adminPostMentor = async (pNewMentor, pOrganisationId) => {
    Swal.fire({
      title: "Yeni bir mentör eklemek istiyor musunuz?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        createNewMentor(pNewMentor, pOrganisationId);
        Swal.fire("Tebrikler, yeni bir mentör eklediniz!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Yeni bir mentör eklemeyi iptal ettiniz!", "", "info");
      }
    });
    const createNewMentor = async (pNewMentor, pOrganisationId) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pNewMentor),
      };
      await fetch(
        `http://localhost:3001/api/v1/gany/mentors?organisationId=${pOrganisationId}`,
        requestOptions
      );
    };
  };

  // Admin ogrenci silme
  const adminDeleteMentor = async (pMentorId) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Bu işlemi geri alamazsınız!",
      icon: "warning",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, onu sil!",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMentor(pMentorId);
        Swal.fire("Silindi!", "Öğrenci silme işlemi başarılı", "success");
      } else if (result.isDenied) {
        Swal.fire("Öğrenci silme işlemini iptal ettiniz!", "", "info");
      }
    });

    const deleteMentor = async (pMentorId) => {
      const dataURL = `http://localhost:3001/api/v1/gany/mentors/${pMentorId}`;
      await fetch(dataURL, { method: "DELETE" });
      getMentors();
    };
  };

  // Admin ogrenci guncelleme
  const adminUpdateMentor = async (pMentorId, pMentorNewInfo) => {
    Swal.fire({
      title: "Değişiklikleri kaydetmek  istiyor musun?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      if (result.isConfirmed) {
        putInfo(pMentorId, pMentorNewInfo);
        Swal.fire("Bilgiler Keydedildi!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bilgiler Kaydedilmedi!", "", "info");
      }
    });

    const putInfo = async (pStudentId, pStudentNewInfo) => {
      const response = await fetch(`http://localhost:3001/api/v1/gany/mentors/${pStudentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pStudentNewInfo),
      });

      await response.json();
      getAdminsAllMentor();
    };
  };

  //Secilen alt kategori iceriklerinin getirilmesi
  const selectedSubCategory = (e) => {
    setSelectedSubCategoryName(e.target.innerText);
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
  };

  const getSubCategoriesMaterials = async (pSubCategoryId) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/materialsbysubcategory?subcategoryId=${pSubCategoryId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setSubCategoryMaterials(data);
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
  };

  /* Mentor profile bilgilerini guncelleme */
  const putMentorProfileInfo = (pNewProfileInfo, pMentorId) => {
    Swal.fire({
      title: "Değişiklikleri kaydetmek  istiyor musun?",
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: "Kaydet",
      denyButtonText: `Vazgeç`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        putInfo(pNewProfileInfo, pMentorId);
        Swal.fire("Bilgiler Keydedildi!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bilgiler Kaydedilmedi!", "", "info");
      }
    });
    const putInfo = async (pNewProfileInfo, pMentorId) => {
      const response = await fetch(`http://localhost:3001/api/v1/gany/mentors/${pMentorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pNewProfileInfo),
      });

      await response.json();
      getMentors();
    };
  };

  //Login olan kisinin email Admin listesinde mevcut mu?
  const adminPostCheck = async (pUser) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pUser),
    };
    const response = await fetch(`http://localhost:3001/api/v1/gany/admins/check`, requestOptions);
    return await response.json();
  };
  // Login olan kisinin email Mentor listesindede mevcut mu?
  const mentorPostCheck = async (pUser) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pUser),
    };
    const response = await fetch(`http://localhost:3001/api/v1/gany/mentors/check`, requestOptions);
    return await response.json();
  };
  // Login olan kisinin email student listesinde mevcut mu?
  const studentPostCheck = async (pUser) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pUser),
    };
    const response = await fetch(
      `http://localhost:3001/api/v1/gany/students/check`,
      requestOptions
    );
    return await response.json();
  };

  const logoutWithRedirect = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  //login olmak isteyenin olup olmadigina ve varsa rolune bakan fonksiyon
  const checkLoginUser = async () => {
    if (isAuthenticated) {
      const statusAdmin = await adminPostCheck(user);
      const statusMentor = await mentorPostCheck(user);
      const statusStudent = await studentPostCheck(user);

      if (statusAdmin.allowLogin) {
        getAdmins();
        setLoginInAdmin(statusAdmin.email);
        console.log("Admin olarak giris yaptiniz");
      } else if (statusMentor.allowLogin) {
        getMentors();
        setLoginInMentor(statusMentor.email);
        console.log("Mentor olarak giris yaptiniz");
      } else if (statusStudent.allowLogin) {
        getStudents();
        setLoginInStudent(statusStudent.email);
        console.log("Ogrenci olarak giris yaptiniz");
      } else {
        logoutWithRedirect();
        console.log("bu email sistemde kayitli degil");
      }
    } else {
      console.log("Sisteme giris yapilamadi");
    }
  };

  return (
    <GanyContext.Provider
      value={{
        materials,
        setSubCategoryMaterials,
        subCategoryMaterials,
        getSubCategoriesMaterials,
        organisations,
        getMaterialsById,
        anMaterial,
        selectedSubCategoryName,
        selectedSubCategory,
        setIsActiveMaterialCard,
        setIsActiveShowItem,
        isActiveMaterialCard, // MaterialCard icinde devamini oku butonu ile cagrilan fonk. calisir
        isActiveShowItem, // MaterialCard icinde devamini oku butonu ile cagrilan fonk. calisir
        students,
        setMentorStudents,
        mentorStudents,
        getMentorStudents,
        mentors,
        admins,
        tasks,
        groups,
        categories,
        subCategories,
        putAdminProfileInfo,
        adminPostStudent,
        adminDeleteStudent,
        adminUpdateStudent,
        adminPostMentor,
        adminDeleteMentor,
        adminUpdateMentor,
        putMentorProfileInfo,
        putStudentProfileInfo,
        getMentors,
        getTasks, //tasklari getirir
        updateTask, // ogrenci task state bilgisini degistirir
        deleteTask, // mentor task siler
        postAddTask, // mentor task ekler
        getLoginInStudentTasks, // login olan ogrencinin tasklarini getirir. odevlerim butonunda calisir
        loginInStudentTasks,
        adminPostGroup,
        loginInMentorEmail,
        loginInStudentEmail,
        loginInAdminEmail,
        loginInAdmin,
        loginInMentor,
        mentorsTaskList,
        getMentorsTaskList,
        loginInStudent,
        mentorsGroups,
        adminsGroups,
        getMentorsGroups,
        getAdminsGroups,
        //groupList,
        checkLoginUser,
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        adminsAllStudents,
        setAdminsAllStudents,
        adminsAllMentors,
        setAdminsAllMentors,
        getAdminsAllMentor,
        getAdminsAllStudents,
        postFeedback,
        feedbacks,
        getFeedbacks,
        deleteFeedback,
      }}
    >
      {props.children}
    </GanyContext.Provider>
  );
};

export default GanyContextProvider;
