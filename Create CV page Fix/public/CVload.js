var refresher
var CVNumber = "CV";

document.addEventListener("DOMContentLoaded", letsgo());
function letsgo() {
    db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").get().then(function (doc) {
        var secondViewing = doc.data().SecondViewing;
        if (secondViewing == true) {
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").get().then(function (snapshot) {
                var numbOfCV = snapshot.size;
                numbOfCV--;
                CVNumber = "CV" + numbOfCV;
                refresher = setInterval(function () { TheUpdate(CVNumber) }, 1000);
            });
        } else {
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").get().then(function (snapshot) {
                var numbOfCV = snapshot.size;
                CVNumber = "CV" + numbOfCV;
                refresher = setInterval(function () { TheUpdate(CVNumber) }, 1000);
            });
        }

    });
}
function TheUpdate(n) {
    db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").get().then(function (doc) {
        var pageLoaded = doc.data().AwaitLoad;
        /* var secVeiwing = doc.data().secondViewing;
        if (secVeiwing == true) {
            n--
        } */
        if (pageLoaded == true) {
            var aboutmeSec = document.getElementById("AboutMePara");
            var ProfileName = document.getElementById("ProfileName");
            var ProfileRegion = document.getElementById("theRegion");
            var ProfilePhone = document.getElementById("PhoneNum");
            var ProfileEmail = document.getElementById("EmailAddress");
            var inputStore = '';
            var PNAme = '';
            var PSurname = '';
            var PPhone = '';
            var PArea = '';
            var PEmail = '';
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).get().then(function (doc) {
                PNAme = doc.data().Name;
                PSurname = doc.data().Surname;
                PPhone = doc.data().Phone;
                PArea = doc.data().Region;
                PEmail = doc.data().Email;
                inputStore = doc.data().AboutMe;
                aboutmeSec.innerHTML = inputStore;
                ProfileName.innerHTML = PNAme + " " + PSurname;
                ProfilePhone.innerHTML = PPhone;
                ProfileRegion.innerHTML = PArea;
                ProfileEmail.innerHTML = PEmail;
            }).catch(function (error) {
                console.log("error is: ", error);
            });
            var ProfileImgRef = storage.ref();
            ProfileImgRef.child('users/sDHiAGDFbrVjC6wO2RhwxD0HGEC2/profile.png').getDownloadURL().then(function (url) {
                var placeholder = document.getElementById('thePlaceHolder');
                placeholder.crossOrigin = "Anonymous";
                placeholder.src = url;
            });
            // for jobs
            var jobCounter = 0;
            var DateStem = "JDate";
            var jobTitleStem = "JobTitle";
            var CompanyStem = "Company";

            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).collection("DocumentEXP").where("addToCV", "==", true).get().then(function (querySnapshot) {
                if (querySnapshot.empty == false) {
                    querySnapshot.forEach(function (doc) {
                        jobCounter++;
                        var Jobtitle = document.getElementById(jobTitleStem + jobCounter);
                        var Organisation = document.getElementById(CompanyStem + jobCounter);
                        var Years = document.getElementById(DateStem + jobCounter);
                        Jobtitle.innerHTML = doc.data().JobTitle;
                        Organisation.innerHTML = doc.data().Organisation;
                        Years.innerHTML = doc.data().years;
                    });
                } else {
                    jobCounter = 1;
                    var Jobtitle = document.getElementById(jobTitleStem + jobCounter);
                    var Organisation = document.getElementById(CompanyStem + jobCounter);
                    var Years = document.getElementById(DateStem + jobCounter);
                    Jobtitle.innerHTML = "";
                    Organisation.innerHTML = "";
                    Years.innerHTML = "";
                }
            });
            //for education
            var educationCounter = 0;
            var dateStem = "Edate";
            var EducationStem = "ETitle";
            var GradeStem = "Grade";
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).collection("DocumentED").where("addToCV", "==", true).get().then(function (querySnapshot) {
                if (querySnapshot.empty == false) {
                    querySnapshot.forEach(function (doc) {
                        educationCounter++;
                        var EDtitle = document.getElementById(EducationStem + educationCounter);
                        var EGrade = document.getElementById(GradeStem + educationCounter);
                        var EYears = document.getElementById(dateStem + educationCounter);
                        EDtitle.innerHTML = doc.data().schholName;
                        EGrade.innerHTML = doc.data().grade;
                        EYears.innerHTML = doc.data().years;
                    });
                } else {
                    while (educationCounter <= 3) {
                        educationCounter++;
                        var EDtitle = document.getElementById(EducationStem + educationCounter);
                        var EGrade = document.getElementById(GradeStem + educationCounter);
                        var EYears = document.getElementById(dateStem + educationCounter);
                        EDtitle.innerHTML = "";
                        EGrade.innerHTML = "";
                        EYears.innerHTML = "";


                    }

                }
            });
            // for Documentation
            var DocumentationCounter = 0;
            var DDateStem = "Ddate";
            var DDName = "DTitle";
            var DDiscription = "DGrade";
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).collection("Documentation").where("addToCV", "==", true).get().then(function (querySnapshot) {
                if (querySnapshot.empty == false) {
                    querySnapshot.forEach(function (doc) {
                        DocumentationCounter++;
                        var DDtitle = document.getElementById(DDName + DocumentationCounter);
                        var DDGrade = document.getElementById(DDiscription + DocumentationCounter);
                        var DDYears = document.getElementById(DDateStem + DocumentationCounter);
                        DDtitle.innerHTML = doc.data().Name;
                        DDGrade.innerHTML = doc.data().No;
                        DDYears.innerHTML = doc.data().Yearz;
                    });
                } else {
                    while (DocumentationCounter <= 2) {
                        DocumentationCounter++;
                        var DDtitle = document.getElementById(DDName + DocumentationCounter);
                        var DDGrade = document.getElementById(DDiscription + DocumentationCounter);
                        var DDYears = document.getElementById(DDateStem + DocumentationCounter);
                        DDtitle.innerHTML = "";
                        DDGrade.innerHTML = "";
                        DDYears.innerHTML = "";
                    }
                }
            });
            //stop interval when saved
            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).collection("Export").where("Exported", "==", true).get().then(function (querySnapshot) {
                if (querySnapshot.empty == false) {
                    StorageString = 'users/sDHiAGDFbrVjC6wO2RhwxD0HGEC2/' + n + '.pdf';
                    html2canvas(document.querySelector("#TheBigBody"), {
                        allowTaint: true,
                        useCORS: true,
                        width: 800
                    }).then(function (canvas) {
                        var image = canvas.toDataURL("image/png");
                        var doc = new jsPDF();
                        doc.addImage(image, 'PNG', 0, 0);
                        var StringURL = doc.output('dataurlstring');
                        var storageRef = storage.ref();
                        var CVRef = storageRef.child(StorageString);
                        CVRef.putString(StringURL, 'data_url').then(function (snapshot) {
                            CVRef.getDownloadURL().then(url => {
                                var link = url;
                                var creationDate = new Date();
                                db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").collection("testCV").doc(n).update({
                                    Link: link,
                                    CreationDate: creationDate.toDateString()
                                });
                            });
                            console.log('file uploaded');
                            db.collection("test").doc("sDHiAGDFbrVjC6wO2RhwxD0HGEC2").update({
                                AwaitLoad: false
                            });
                            console.log("done and dusted");
                        });

                    });
                    clearInterval(refresher);
                    return;
                }
            })
        }
    });

}