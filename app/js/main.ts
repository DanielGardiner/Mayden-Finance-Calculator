
document.querySelector('form').addEventListener('submit', function (e) {
    let amountBorrowed: number = parseInt(this.inputToBorrow.value)
    let expectedSalary: number = parseInt(this.inputSalary.value)
    let monthlyRepaymentPercent: number = parseInt(this.inputMonthlyRepayment.value)

    let adminFee: number = amountBorrowed * 0.05

    if(amountBorrowed > 7200) {
        adminFee += 1000
    } else if (amountBorrowed > 6400) {
        adminFee += 500
    }

    let totalBorrowed: number = amountBorrowed + adminFee


    let monthlyRepayment:number = (expectedSalary/12) * (monthlyRepaymentPercent/100)
    let monthsToPayOff:number = totalBorrowed/monthlyRepayment



    let yearsToPayOff:number = monthsToPayOff % 12

    monthsToPayOff = monthsToPayOff - (12 * yearsToPayOff)

    let results = {
        amountBorrowed: amountBorrowed,
        adminFee: adminFee,
        totalBorrowed: totalBorrowed,
        monthlyRepayment: monthlyRepayment,
        yearsToPayOff: yearsToPayOff,
        monthsToPayOff: monthsToPayOff
    }

    console.log(results)

    e.preventDefault()

    document.querySelector('.hide').style.display = 'block'

    window.scrollTo(0, document.body.scrollHeight);

    var source = document.querySelector("#template").innerHTML

    var template = Handlebars.compile(source)

    let html = template(results)

    document.querySelector('.hide').innerHTML = html

})









