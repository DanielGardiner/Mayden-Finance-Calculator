document.querySelector('form').addEventListener('submit', function (e) {
    var amountBorrowed = parseFloat(this.inputToBorrow.value);
    var expectedSalary = parseFloat(this.inputSalary.value);
    var monthlyRepaymentPercent = parseFloat(this.inputMonthlyRepayment.value);
    var adminFee = amountBorrowed * 0.05;
    amountBorrowed = applyAdditionalChange(amountBorrowed);
    var totalBorrowed = amountBorrowed + adminFee;
    var monthlyRepayment = calculateMonthlyRepayment(expectedSalary, monthlyRepaymentPercent, amountBorrowed);
    var monthsToPayOff = amountBorrowed / monthlyRepayment;
    var yearsToPayOff = Math.floor(monthsToPayOff / 12);
    monthsToPayOff = (monthsToPayOff - (12 * yearsToPayOff));
    if (monthsToPayOff > 11 && monthsToPayOff <= 12) {
        yearsToPayOff += 1;
        monthsToPayOff = 0;
    }
    var repaymentTimeText = generateRepaymentTimeText(amountBorrowed, monthlyRepayment, yearsToPayOff, monthsToPayOff);
    var results = {
        adminFee: roundDownAddCommas(adminFee, 2),
        totalBorrowed: roundDownAddCommas(totalBorrowed, 2),
        repaymentTimeText: repaymentTimeText
    };
    e.preventDefault();
    document.querySelector('.hide').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
    var source = document.querySelector("#template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(results);
    document.querySelector('.hide').innerHTML = html;
});
function applyAdditionalChange(amountBorrowed) {
    if (amountBorrowed > 7200) {
        amountBorrowed += 1000;
    }
    else if (amountBorrowed > 6400) {
        amountBorrowed += 500;
    }
    return amountBorrowed;
}
function calculateMonthlyRepayment(expectedSalary, monthlyRepaymentPercent, amountBorrowed) {
    var monthlyRepayment = (expectedSalary / 12) * (monthlyRepaymentPercent / 100);
    monthlyRepayment = Math.min(monthlyRepayment, amountBorrowed);
    return monthlyRepayment;
}
function generateRepaymentTimeText(amountBorrowed, monthlyRepayment, yearsToPayOff, monthsToPayOff) {
    console.log(Math.ceil(monthsToPayOff));
    console.log(monthsToPayOff);
    var text = 'The remaining <span class="enhance-primary">£' +
        roundDownAddCommas(amountBorrowed, 2) + '</span> of the loan will be payed off at <span class="enhance-secondary">£' +
        roundDownAddCommas(monthlyRepayment, 2) + '</span> per month over <span class="enhance-secondary">' +
        yearsToPayOff + ' years</span> and <span class="enhance-secondary">' +
        Math.ceil(monthsToPayOff) + ' months</span>';
    // fix plurals, remove 0 years / 0 months text, and remove unnecessary trailing .0
    text = text.replace('<span class="enhance-primary">1 years</span>', '1 year');
    text = text.replace('<span class="enhance-secondary">0 years</span> and ', '');
    text = text.replace('<span class="enhance-secondary">1 months', '<span class="enhance-secondary">1.0 month');
    text = text.replace('and <span class="enhance-secondary">0 months</span>', '');
    text = text.replace('.0 months', ' months'); // remove trailing .0
    text = text.replace('.0 month', ' month'); // remove trailing .0
    text = text.replace('per month over <span class="enhance-secondary">1 month</span>', 'within <span class="enhance-secondary">1 month</span>');
    return text;
}
showWarningBorder('#inputToBorrow', 1, 8000);
showWarningBorder('#inputSalary', 1, Infinity);
showWarningBorder('#inputMonthlyRepayment', 1, 100);
function showWarningBorder(element, min, max) {
    document.querySelector(element).addEventListener('input', function () {
        // contains 3 numeric characters after decimal
        var regexp = '(?=[^\\0])(?=^([0-9]+){0,1}(\\.[0-9]{1,2}){0,1}$)';
        if (this.value < min || this.value > max || this.value.match(regexp) === null) {
            this.style.border = '4px solid #f05f55';
        }
        else {
            this.style.border = '1px solid #dbdbdb';
        }
    });
}
function roundDownAddCommas(x, decimalPlaces) {
    var xString = x.toString();
    if (x < 0.01) {
        xString = x.toPrecision(1);
    }
    else {
        xString = x.toFixed(decimalPlaces);
    }
    xString = xString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    xString = xString.replace(/\.00$/, '');
    return xString;
}
