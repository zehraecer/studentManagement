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

studentTable.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("adadad");
    if (students.style.display = "none") {
        students.style.display = "block"
        classEs.style.display = "none"
        classAndStudents.style.display = "none"
    } else {
        students.style.display = "none"
    }
})

classestable.addEventListener("click", getClass)



async function getClass() {
    const classes = await getTable('classes')
    classEs.innerHTML = ""
    console.log(classEs);
    if (students.style.display = "block") {
        students.style.display = "none"
        classEs.style.display = "block"
        classAndStudents.style.display = "none"
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
        classAndStudents.style.display = "block"
    }


    const id = this.id
    console.log(id);
    const x = classes.find(user => user.id == this.id)
    console.log(x);

    const y = student.filter(user => user.student_class == x.id)
    console.log(y);
    for (const z of y) {
        console.log(z);
        classAndStudents.innerHTML += `
            <li>${z.student_name}  ${z.student_surName} ${z.student_number} ${z.student_class}</li>

        `
    }

}



form.addEventListener("submit", getData)



async function getTable(element) {

    let { data, error } = await _supabase.from(element).select()

    if (error) { return [] }

    return data
}



async function getStudents() {
    const students = await getTable('Students')
    const classes = await getTable('classes')
    const lessons = await getTable('lessons')

    console.log(students);
    studentList.innerHTML = ""
    for (const student of students) {
        studentList.innerHTML +=

            `
            <tr tr class="students-list-two" >

                    <td>${student.student_name}</td>
                    <td>${student.student_surName}</td>
                    <td>${student.student_number}</td>
                    <td>${student.student_class}</td>


                </tr >

            `
    }


    // classes.map(item => {

    //     students.innerHTML += `

    //   <tr class="students-list-two">

    //         <td>Name</td>
    //         <td>Surname</td>
    //         <td>numbers</td>
    //         <td>class</td>

    // </tr>
    //   `

    // })


}


async function getData(e) {
    e.preventDefault()



    const formData = new FormData(e.target)
    const formObj = Object.fromEntries(formData)
    const { data, error } = await _supabase
        .from('Students')
        .insert([
            {
                student_name: formObj.student_name,
                student_surName: formObj.student_surName,
                student_class: formObj.student_class,
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

