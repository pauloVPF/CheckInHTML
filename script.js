let Members = [
    {
        name: "Paulo Victor",
        email: "paulo@gmail.com",
        registerDate: new Date(2024, 1, 15, 19, 20),
        checkInDate: null
    },

    {
        name: "Maria Luiza",
        email: "malu@gmail.com",
        registerDate: new Date(2024, 11, 26, 13, 20),
        checkInDate: null
    },

    {
        name: "João da Silva",
        email: "joao@gmail.com",
        registerDate: new Date(2024, 2, 5, 10, 0),
        checkInDate: new Date(2024, 2, 10, 15, 0)
    },

    {
        name: "Ana Oliveira",
        email: "ana@gmail.com",
        registerDate: new Date(2024, 2, 10, 14, 30),
        checkInDate: new Date(2024, 2, 15, 8, 0)
    },

    {
        name: "Marcos Santos",
        email: "marcos@gmail.com",
        registerDate: new Date(2024, 2, 15, 9, 45),
        checkInDate: new Date(2024, 2, 20, 17, 30)
    },

    {
        name: "Pedro Souza",
        email: "pedro@gmail.com",
        registerDate: new Date(2024, 3, 1, 15, 30),
        checkInDate: new Date(2024, 3, 6, 9, 0)
    },

    {
        name: "Larissa Oliveira",
        email: "larissa@gmail.com",
        registerDate: new Date(2024, 3, 6, 10, 45),
        checkInDate: new Date(2024, 3, 11, 18, 30)
    },

    {
        name: "Mariana Santos",
        email: "mariana@gmail.com",
        registerDate: new Date(2024, 3, 11, 19, 0),
        checkInDate: new Date(2024, 3, 16, 12, 0)
    },

    {
        name: "Camila Lima",
        email: "camila@gmail.com",
        registerDate: new Date(2024, 2, 20, 16, 10),
        checkInDate: new Date(2024, 2, 25, 20, 45)
    },

    {
        name: "Rafaela Costa",
        email: "rafaela@gmail.com",
        registerDate: new Date(2024, 2, 25, 11, 20),
        checkInDate: new Date(2024, 3, 1, 14, 15)
    }
];

const newMember = (Member) => {
    const registerDate = dayjs(Date.now()).to(Member.registerDate)
    let checkInDate = dayjs(Date.now()).to(Member.checkInDate)

    if(Member.checkInDate == null) {
        checkInDate =
        `<button data-email="${Member.email}" onclick="checkIn(event)">Confirmar Check-In</button>`
    }

    return`
    <tr>
    <td>
      <strong>
        ${Member.name}
      </strong>
      <br>
      <small>
        ${Member.email}
      </small>
    </td>
    <td>${registerDate}</td>
    <td>${checkInDate}</td>
  </tr>
  `
}

const updateList = (Members) => {
    let output = ""
    for(let Member of Members) {
        output = output + newMember(Member)
    }

    document.querySelector('tbody').innerHTML = output
}

updateList(Members)

const addMember = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const Member = {
        name: formData.get('name'),
        email: formData.get('email'),  
        registerDate: new Date(),  
        checkInDate: null
    }

    // verify that the Member already exist

    const memberExist = Members.find(
        (m) => m.email == Member.email)

    if(memberExist) {
        alert('Email já cadastrado!')
        return
    }

    Members = [Member, ...Members]
    updateList(Members)

    // clean form

    event.target.querySelector('[name="name"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const checkIn = (event) => {
    //confirm check-in
    const checkinMessage = 'Você realmente quer fazer o Check-In?'
    if(confirm(checkinMessage) == false) {
        return
    }

    //find the Member in the list
    const Member = Members.find(
        (m) => m.email == event.target.dataset.email)

    // update check-in
    Member.checkInDate = new Date()

    // update list of Members
    updateList(Members)
}