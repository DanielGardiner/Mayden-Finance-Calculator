
document.querySelector('form').addEventListener('submit', function (e) {
    let amountBorrowed: number = parseInt(this.inputToBorrow.value)

    let expectedSalary: number = parseInt(this.inputSalary.value)

    let monthlyRepaymentPercent: number = parseInt(this.inputMonthlyRepayment.value)

    let adminFee = calculateAdminFee(amountBorrowed)

    let totalBorrowed: number = amountBorrowed + adminFee

    let monthlyRepayment: number = (expectedSalary/12) * (monthlyRepaymentPercent/100)

    monthlyRepayment = parseInt(Math.min(monthlyRepayment, amountBorrowed).toFixed(1))

    let monthsToPayOff: number = amountBorrowed/monthlyRepayment

    let yearsToPayOff: number = Math.floor(monthsToPayOff / 12)

    monthsToPayOff =  (monthsToPayOff - (12 * yearsToPayOff))

    monthsToPayOff =  parseInt(monthsToPayOff.toFixed(1))

    let repaymentTimeText = generateRepaymentTimeText(
        amountBorrowed,
        monthlyRepayment,
        yearsToPayOff,
        monthsToPayOff
    )

    let results = {
        amountBorrowed: amountBorrowed,
        adminFee: numberWithCommas(adminFee),
        totalBorrowed: numberWithCommas(totalBorrowed),
        monthlyRepayment: monthlyRepayment,
        yearsToPayOff: yearsToPayOff,
        monthsToPayOff: monthsToPayOff,
        repaymentTimeText: repaymentTimeText
    }

    e.preventDefault()

    document.querySelector('.hide').style.display = 'block'

    window.scrollTo(0, document.body.scrollHeight);

    let source = document.querySelector("#template").innerHTML

    let template = Handlebars.compile(source)

    let html = template(results)

    document.querySelector('.hide').innerHTML = html

})

function calculateAdminFee (amountBorrowed: number): number {
    let adminFee: number = amountBorrowed * 0.05

    if(amountBorrowed > 7200) {
        adminFee += 1000
    } else if (amountBorrowed > 6400) {
        adminFee += 500
    }

    adminFee = parseInt(adminFee.toFixed(1))

    return adminFee
}

function generateRepaymentTimeText(amountBorrowed: number,
                                   monthlyRepayment: number,
                                   yearsToPayOff: number,
                                   monthsToPayOff: number):string {

    let text: string = 'The remaining <span class="enhance-primary">£' +
        numberWithCommas(amountBorrowed) + '</span> of the loan will be payed off at <span class="enhance-secondary">£' +
        numberWithCommas(monthlyRepayment) + '</span> over <span class="enhance-secondary">' +
        numberWithCommas(yearsToPayOff) + ' years</span> and <span class="enhance-secondary">' +
        numberWithCommas(monthsToPayOff) + ' months</span>'

    // fix plurals and remove e.g. 0 years / 0 months
    text = text.replace('1 years', '1 year')
    text = text.replace('<span class="enhance-secondary">0 years</span> and ', '')
    text = text.replace('1 months', '1 month')
    text = text.replace('and <span class="enhance-secondary">0 months</span>', '')
    text = text.replace('over <span class="enhance-secondary">1 month</span>', 'within <span class="enhance-secondary">1 month</span>')
    text = text.replace('.0</span>', '</span>') // remove trailing .0

    return text

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

showWarningBorder('#inputToBorrow', 1, 8000)

showWarningBorder('#inputSalary', 1, Infinity)

showWarningBorder('#inputMonthlyRepayment', 1, 100)

function showWarningBorder(element, min, max) {
    document.querySelector(element).addEventListener('input', function () {
        if (this.value < min || this.value > max) {
            this.style.border = '4px solid #f05f55'
        } else {
            this.style.border = 'none'
        }
    })
}




