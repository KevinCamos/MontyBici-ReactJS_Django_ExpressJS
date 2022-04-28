// import { createData } from '../hooks/useRegisterCredit';
// function createData(created_at="", movement="", amount="") {
//     if (created_at === "") {
//         return
//     }
//     let created_at_date = new Date(created_at)

//     if (created_at_date.toLocaleString() !== "Invalid Date") {
        
//             if(new Date(created_at).getTime()>Date.now() ){
//                  created_at_date =  Date.now()
    
//             }
//         created_at = created_at_date.toLocaleString()
//     }
//     return { created_at, movement, amount };
// }
test('create data, useRegisterCredit', () => {
    const result = createData("2022-04-19T20:03:18.661285+02:00", "5.00", "5.00")

    expect(result).toStrictEqual({
        "created_at": "4/19/2022, 8:03:18 PM",
        "movement": "5.00",
        "amount": "5.00"
    })
})
test('create data, useRegisterCredit', () => {
    const result = createData("", "5.00", "5.00")
    expect(result).toBe()
})
test('create data, useRegisterCredit', () => {
    const result = createData("")
    expect(result).toBe()
})
test('create data, useRegisterCredit', () => {
    const result = createData("asdfsadf","5.00","5.00" )
    expect(result).toStrictEqual({
        "created_at": "asdfsadf",
        "movement": "5.00",
        "amount": "5.00"
    })
})

test('create data, useRegisterCredit', () => {
    const result = createData("3216","5.00","5.00" )
    let dataNow= Date.now().toLocaleString()
    expect(result).toStrictEqual({
        "created_at": `${dataNow}`,
        "movement": "5.00",
        "amount": "5.00"
    })
})
