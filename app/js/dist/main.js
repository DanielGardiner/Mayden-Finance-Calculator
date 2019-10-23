document.querySelector('form').addEventListener('submit', function (e) {
    var amountBorrowed = parseInt(this.inputToBorrow.value);
    var expectedSalary = parseInt(this.inputSalary.value);
    var monthlyRepaymentPercent = parseInt(this.inputMonthlyRepayment.value);
    var adminFee = calculateAdminFee(amountBorrowed);
    var totalBorrowed = amountBorrowed + adminFee;
    var monthlyRepayment = (expectedSalary / 12) * (monthlyRepaymentPercent / 100);
    monthlyRepayment = Math.min(monthlyRepayment, amountBorrowed);
    var monthsToPayOff = amountBorrowed / monthlyRepayment;
    var yearsToPayOff = Math.floor(monthsToPayOff / 12);
    monthsToPayOff = (monthsToPayOff - (12 * yearsToPayOff));
    var repaymentTimeText = generateRepaymentTimeText(amountBorrowed, monthlyRepayment, yearsToPayOff, monthsToPayOff);
    var results = {
        amountBorrowed: amountBorrowed,
        adminFee: roundDownAddCommas(adminFee, 2),
        totalBorrowed: roundDownAddCommas(totalBorrowed, 2),
        monthlyRepayment: monthlyRepayment,
        yearsToPayOff: yearsToPayOff,
        monthsToPayOff: monthsToPayOff,
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
function calculateAdminFee(amountBorrowed) {
    var adminFee = amountBorrowed * 0.05;
    if (amountBorrowed > 7200) {
        adminFee += 1000;
    }
    else if (amountBorrowed > 6400) {
        adminFee += 500;
    }
    return adminFee;
}
function generateRepaymentTimeText(amountBorrowed, monthlyRepayment, yearsToPayOff, monthsToPayOff) {
    var text = 'The remaining <span class="enhance-primary">£' +
        roundDownAddCommas(amountBorrowed, 2) + '</span> of the loan will be payed off at <span class="enhance-secondary">£' +
        roundDownAddCommas(monthlyRepayment, 2) + '</span> over <span class="enhance-secondary">' +
        yearsToPayOff + ' years</span> and <span class="enhance-secondary">' +
        roundDownAddCommas(monthsToPayOff, 1) + ' months</span>';
    // fix plurals and remove 0 years/0 months text
    text = text.replace('1 years', '1 year');
    text = text.replace('<span class="enhance-secondary">0 years</span> and ', '');
    text = text.replace('<span class="enhance-secondary">1 months', '<span class="enhance-secondary">1 month');
    text = text.replace('and <span class="enhance-secondary">0 months</span>', '');
    text = text.replace('over <span class="enhance-secondary">1 month</span>', 'within <span class="enhance-secondary">1 month</span>');
    return text;
}
showWarningBorder('#inputToBorrow', 1, 8000);
showWarningBorder('#inputSalary', 1, Infinity);
showWarningBorder('#inputMonthlyRepayment', 1, 100);
function showWarningBorder(element, min, max) {
    document.querySelector(element).addEventListener('input', function () {
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
