const supabaseUrl = "https://gwmohqcgjtcoddbbhwlg.supabase.co"

const supabaseApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bW9ocWNnanRjb2RkYmJod2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4OTkzNTIsImV4cCI6MjAzMDQ3NTM1Mn0.lweBCSYqY59P-xv3Cmk7OMqI5i9ijGy2I3lnLh-rNxE"

const _supabase = supabase.createClient(supabaseUrl, supabaseApiKey)

const form = document.querySelector(".form")
const studentList = document.querySelector(".students-list")
const classEs = document.querySelector(".classes")
const classestable = document.querySelector(".classesTable")
const lessons = document.querySelector(".lessons")
const studentTable = document.querySelector(".studentTable")
const students = document.querySelector(".students")
const classAndStudents = document.querySelector(".classAndStudents")
const statusTable = document.querySelector(".statusTable")
const statusList = document.querySelector(".statusList")

statusTable.addEventListener("click", getStatusTable)
classestable.addEventListener("click", getClass)
form.addEventListener("submit", getData)


async function getTable(element) {

    let { data, error } = await _supabase.from(element).select()

    if (error) { return [] }

    return data
}


async function getStatusTable(e) {
    e.preventDefault()
    const users = await getTable("status");
    const classes = await getTable('classes');
    const student = await getTable('Students');


    if (statusList.style.display = "none") {
        statusList.style.display = "block"
        classEs.style.display = "none"
        classAndStudents.style.display = "none"
        students.style.display = "none"
    }


    const userStudentIds = users.map(user => user.student_id);
    console.log(userStudentIds);

    const matchedStudents = student.filter(student => userStudentIds.includes(student.id));

    console.log(matchedStudents);
    statusList.innerHTML = ""
    for (const matchedStudent of matchedStudents) {
        statusList.innerHTML +=
            `
            <li> ${matchedStudent.student_name} - ${matchedStudent.student_surName}- ${matchedStudent.student_class1}</li>
        `
    }


}

studentTable.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("adadad");
    if (students.style.display = "none") {
        students.style.display = "grid"
        classEs.style.display = "none"
        classAndStudents.style.display = "none"
    } else {
        students.style.display = "none"
    }
})






async function getClass() {
    const classes = await getTable('classes')
    classEs.innerHTML = ""
    if (students.style.display = "block") {
        students.style.display = "none"
        classEs.style.display = "block"
        classAndStudents.style.display = "none"
        statusList.style.display = "none"
    }

    for (const clas of classes) {
        classEs.innerHTML +=
            `
            <div class="class-list">

            <div class="classes-list-two"  id="${clas.id}">
                <a>${clas.class_name}</a>
                <a>${clas.class_teacher}</a >
                <a>${clas.class_lesson}</a>

            </div>

        </div >
            `

    }

    const classeslisttwo = document.querySelectorAll(".classes-list-two")

    for (const classes of classeslisttwo) {

        classes.addEventListener("click", getclassStudents)
    }

}

async function getclassStudents() {
    const classes = await getTable('classes')
    const student = await getTable('Students')
    classAndStudents.innerHTML = ""

    if (classAndStudents.style.display = "none") {
        students.style.display = "none"
        classEs.style.display = "none"
        classAndStudents.style.display = "flex"
    }

    const id = this.id
    const x = classes.find(user => user.id == this.id)
    console.log(x);
    const y = student.filter(user => user.student_class1 == x.class_name)
    console.log(y);

    for (const z of y) {
        classAndStudents.innerHTML += `
                          <form  id="${z.id}" class="statusForm">
                            <h3>${z.student_name}  ${z.student_surName} ${z.student_number} ${z.student_class1}</h3>
                            

                            <div class="statusFormDiv">

                                <input type="radio" id="true" name="fav_language" value="true">
                                 <input type="radio" id="false" name="fav_language" value="false">
                                                                   
                             </div>
                                        
                             <input type="submit" value="gönder">
                             </form>
        `
    }
    statusForm()
}



async function statusForm() {
    const status = document.querySelectorAll(".statusForm")
    const classes = await getTable('classes')
    const student = await getTable('Students')

    for (const statu of status) {
        statu.addEventListener("submit", async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const formObj = Object.fromEntries(formData)

            const { data, error } = await _supabase
                .from('status')
                .insert([
                    {
                        status_current: formObj.fav_language,
                        student_id: e.target.id
                    },
                ])
                .select()
            console.log(data);
        })
    }
}




async function getStudents() {
    const students = await getTable('Students')
    console.log(students);

    studentList.innerHTML = ""
    for (const student of students) {
        studentList.innerHTML +=

            `
            <tr tr class="students-list-two" >

                    <td>${student.student_name}</td>
                    <td>${student.student_surName}</td>
                    <td>${student.student_number}</td>
                    <td>${student.student_class1}</td>


                </tr >

            `
    }

}

async function getData(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObj = Object.fromEntries(formData)
    console.log(formObj);

    const classes = await getTable('classes')

    const { data, error } = await _supabase
        .from('Students')
        .insert([
            {
                student_name: formObj.student_name,
                student_surName: formObj.student_surName,
                student_class1: formObj.student_class,
                student_number: formObj.student_Number

            }
        ])
        .select()
    if (error) {
        console.log("hatalı");
    }
    e.target.reset()
    getStudents()

}


getStudents()

