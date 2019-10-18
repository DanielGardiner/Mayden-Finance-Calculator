document.querySelector('form').addEventListener('submit', function (e) {
    var amountBorrowed = parseInt(this.inputToBorrow.value);
    var expectedSalary = parseInt(this.inputSalary.value);
    var monthlyRepaymentPercent = parseInt(this.inputMonthlyRepayment.value);
    var adminFee = amountBorrowed * 0.05;
    if (amountBorrowed > 7200) {
        adminFee += 1000;
    }
    else if (amountBorrowed > 6400) {
        adminFee += 500;
    }
    var totalBorrowed = amountBorrowed + adminFee;
    var monthlyRepayment = (expectedSalary / 12) * (monthlyRepaymentPercent / 100);
    var monthsToPayOff = totalBorrowed / monthlyRepayment;
    var yearsToPayOff = monthsToPayOff % 12;
    monthsToPayOff = monthsToPayOff - (12 * yearsToPayOff);
    var results = {
        amountBorrowed: amountBorrowed,
        adminFee: adminFee,
        totalBorrowed: totalBorrowed,
        monthlyRepayment: monthlyRepayment,
        yearsToPayOff: yearsToPayOff,
        monthsToPayOff: monthsToPayOff
    };
    console.log(results);
    e.preventDefault();
    document.querySelector('.hide').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
    var source = document.querySelector("#template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(results);
    document.querySelector('.hide').innerHTML = html;
});
