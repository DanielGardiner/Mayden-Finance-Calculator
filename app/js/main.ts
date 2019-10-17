// $(function () {
//     $('form').submit(function(e) {
//         console.log('yo')
//         e.preventDefault()
//         $('.output').slideDown('slow');
//
//     });
// })
//

document.querySelector('form').addEventListener('submit', function (e) {
    let amountBorrowed: number = parseInt(this.inputToBorrow.value)
    let expectedSalary: number = parseInt(this.inputSalary.value)
    let monthlyRepaymentPercent: number = parseInt(this.inputMonthlyRepayment.value)

    let admimnFee: number = amountBorrowed * 0.05

    if(amountBorrowed > 7200) {
        admimnFee += 1000
    } else if (amountBorrowed > 6400) {
        admimnFee += 500
    }

    let totalBorrowed: number = amountBorrowed + admimnFee

    console.log( totalBorrowed)

    let monthlyRepayment:number = totalBorrowed * monthlyRepaymentPercent/100
    let timeToPayOff:number = totalBorrowed/monthlyRepayment

    // console.log( amountBorrowed)
    console.log( totalBorrowed)
    console.log(monthlyRepayment)
    console.log(timeToPayOff)

    results = {
        amountBorrowed: amountBorrowed,
        admimnFee: admimnFee,
        totalBorrowed: totalBorrowed,
        monthlyRepayment: monthlyRepayment,
        timetoPayOff: timeToPayOff
    }

    console.log(results)

    e.preventDefault()
    document.querySelector('.output').style.display = 'block'
    window.scrollTo(0, document.body.scrollHeight);




})

