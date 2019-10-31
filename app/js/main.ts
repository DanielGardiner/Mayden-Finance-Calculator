
document.querySelector('form').addEventListener('submit', function (e) {
    let amountBorrowed: number = parseFloat(this.inputToBorrow.value)

    let expectedSalary: number = parseFloat(this.inputSalary.value)

    let monthlyRepaymentPercent: number = parseFloat(this.inputMonthlyRepayment.value)

    let adminFee = amountBorrowed * 0.05

    amountBorrowed = applyAdditionalChange(amountBorrowed)

    let totalBorrowed: number = amountBorrowed + adminFee

    let monthlyRepayment: number = calculateMonthlyRepayment(expectedSalary, monthlyRepaymentPercent, amountBorrowed)

    let monthsToPayOff: number = amountBorrowed/monthlyRepayment

    let yearsToPayOff: number = Math.floor(monthsToPayOff / 12)

    monthsToPayOff =  (monthsToPayOff - (12 * yearsToPayOff))

    if (monthsToPayOff > 11 && monthsToPayOff <= 12) {
        yearsToPayOff += 1
        monthsToPayOff = 0
    }

    let repaymentTimeText: string = generateRepaymentTimeText(
        amountBorrowed,
        monthlyRepayment,
        yearsToPayOff,
        monthsToPayOff
    )


    let results = {
        adminFee: roundDownAddCommas(adminFee, 2),
        totalBorrowed: roundDownAddCommas(totalBorrowed, 2),
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

function applyAdditionalChange(amountBorrowed: number): number {

    if(amountBorrowed > 7200) {
        amountBorrowed += 1000
    } else if (amountBorrowed > 6400) {
        amountBorrowed += 500
    }

    return amountBorrowed
}

function calculateMonthlyRepayment(expectedSalary: number, monthlyRepaymentPercent: number, amountBorrowed: number): number {

    let monthlyRepayment: number = (expectedSalary/12) * (monthlyRepaymentPercent/100)

    monthlyRepayment = Math.min(monthlyRepayment, amountBorrowed)

    return monthlyRepayment

}

function generateRepaymentTimeText(amountBorrowed: number,
                                   monthlyRepayment: number,
                                   yearsToPayOff: number,
                                   monthsToPayOff: number):string {

    console.log(Math.ceil(monthsToPayOff))
    console.log(monthsToPayOff)

    let text: string = 'The remaining <span class="enhance-primary">£' +
        roundDownAddCommas(amountBorrowed, 2) + '</span> of the loan will be payed off at <span class="enhance-secondary">£' +
        roundDownAddCommas(monthlyRepayment, 2) + '</span> per month over <span class="enhance-secondary">' +
        yearsToPayOff + ' years</span> and <span class="enhance-secondary">' +
        Math.ceil(monthsToPayOff) + ' months</span>'

    // fix plurals, remove 0 years / 0 months text, and remove unnecessary trailing .0
    text = text.replace('<span class="enhance-primary">1 years</span>', '1 year')
    text = text.replace('<span class="enhance-secondary">0 years</span> and ', '')
    text = text.replace('<span class="enhance-secondary">1 months', '<span class="enhance-secondary">1.0 month')
    text = text.replace('and <span class="enhance-secondary">0 months</span>', '')
    text = text.replace('.0 months', ' months') // remove trailing .0
    text = text.replace('.0 month', ' month') // remove trailing .0
    text = text.replace('per month over <span class="enhance-secondary">1 month</span>', 'within <span class="enhance-secondary">1 month</span>')

    return text
}


showWarningBorder('#inputToBorrow', 1, 8000)

showWarningBorder('#inputSalary', 1, Infinity)

showWarningBorder('#inputMonthlyRepayment', 1, 100)

function showWarningBorder(element, min, max) {
    document.querySelector(element).addEventListener('input', function () {

        // contains 3 numeric characters after decimal
        let regexp:string = '(?=[^\\0])(?=^([0-9]+){0,1}(\\.[0-9]{1,2}){0,1}$)'

        if (this.value < min || this.value > max || this.value.match(regexp) === null) {
            this.style.border = '4px solid #f05f55'
        } else {
            this.style.border = '1px solid #dbdbdb'
        }
    })
}

function roundDownAddCommas(x: number, decimalPlaces: number): string {
    let xString: string = x.toString()

    if (x < 0.01) {
        xString = x.toPrecision(1)
    } else {
        xString = x.toFixed(decimalPlaces)
    }

    xString = xString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    xString = xString.replace(/\.00$/,'')

    return xString
}
