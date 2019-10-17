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
    var amountBorrowed = parseInt(this.inputToBorrow.value);
    var expectedSalary = parseInt(this.inputSalary.value);
    var monthlyRepaymentPercent = parseInt(this.inputMonthlyRepayment.value);
    var admimnFee = amountBorrowed * 0.05;
    if (amountBorrowed > 7200) {
        admimnFee += 1000;
    }
    else if (amountBorrowed > 6400) {
        admimnFee += 500;
    }
    var totalBorrowed = amountBorrowed + admimnFee;
    console.log(totalBorrowed);
    var monthlyRepayment = totalBorrowed * monthlyRepaymentPercent / 100;
    var timeToPayOff = totalBorrowed / monthlyRepayment;
    // console.log( amountBorrowed)
    console.log(totalBorrowed);
    console.log(monthlyRepayment);
    console.log(timeToPayOff);
    results = {
        amountBorrowed: amountBorrowed,
        admimnFee: admimnFee,
        totalBorrowed: totalBorrowed,
        monthlyRepayment: monthlyRepayment,
        timetoPayOff: timeToPayOff
    };
    console.log(results);
    e.preventDefault();
    document.querySelector('.output').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
});
