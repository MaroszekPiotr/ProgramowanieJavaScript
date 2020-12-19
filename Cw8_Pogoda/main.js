// let a;
// let b;
// let c;
// // let myPromise1 = new Promise(function (myResolve, myReject) {
// //     setTimeout(() => {
// //         myResolve(a = 2);
// //     }, 2000);
// //     setTimeout(() => {
// //         myReject(6);

// //     }, 21000);
// // });
// let myPromise1 = new Promise((myResolve, myReject) => {
//     setTimeout(() => {
//         myResolve(a = 2);
//     }, 2000);
//     setTimeout(() => {
//         myReject(6);

//     }, 21000);
// });
// let myPromise2 = new Promise(function (myResolve, myReject) {
//     setTimeout(() => {
//         myResolve(b = 5);
//     }, 8000);
//     setTimeout(() => {
//         myReject(6);

//     }, 21000);
// });

// Promise.all([myPromise1, myPromise2])
//     .then((value) => console.log(c = a + b));

// // myPromise1
// //     .then((value) => console.log(value));

// // console.log(myPromise1);