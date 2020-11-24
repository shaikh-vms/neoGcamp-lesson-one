const { transform } = require('../../../../shared');

async function implementation(
  inputs,
  parameters,
  context,
  dependencies,
) {
  const { transform } = parameters;
  const { productDetails } = dependencies;
  await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  await context.evaluate(async function () {
    function stall(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    };
    const GetTagByIdUsingRegex = (tag, id, html) => {
      return new RegExp('<' + tag + "[^>]*id[\\s]?=[\\s]?['\"]" + id + "['\"][\\s\\S]*?</" + tag + '>').exec(html);
    };
    function addElementToDocument(doc, key, value) {
      const catElement = document.createElement('div');
      catElement.id = key;
      catElement.textContent = value;
      catElement.style.display = 'none';
      doc.appendChild(catElement);
    }

    await fetch(window.location.href, { method: 'GET' }).then(r => r.text()).then(htm => {
      const result = GetTagByIdUsingRegex('script', 'is_script', htm);
      const outerHTML = result && result[0] ? result[0] : '';
      const JSstring = JSON.parse(outerHTML.split('window.__INITIAL_STATE__ = ')[1].split(';\n</script>')[0]);
      const widgets = JSstring.pageDataV4.page.data[10003];

      const lastProductPosition = localStorage.getItem('prodCount') ? Number(localStorage.getItem('prodCount')) : 1;
      const productSelectors = document.querySelectorAll('div._13oc-S > div');
      for (let i = 0; i < productSelectors.length; i++) {
        addElementToDocument(productSelectors[i], 'rankOrganic', `${lastProductPosition + i}`);
        const id = document.querySelectorAll('div._13oc-S div')[i] ? document.querySelectorAll('div._13oc-S > div')[i].getAttribute('data-id') : '';
        const urlData = document.querySelectorAll('a.s1Q9rs')[i] ? document.querySelectorAll('a.s1Q9rs')[i].href : document.querySelectorAll('a._2rpwqI')[i].href;
        document.querySelectorAll('div._13oc-S > div')[i].setAttribute('producturl', `${urlData}`);
        for (let j = 1; j < widgets.length; j++) {
          stall(15000);
          if (widgets[j].widget.data.products && widgets[j].widget.data.products.length) {
            for (let k = 0; k < widgets[j].widget.data.products.length; k++) {
              const productId = widgets[j].widget.data.products[k].productInfo.value.id;
              const imageUrl = widgets[j].widget.data.products[k].productInfo.value.media.images[0].url;
              const image = imageUrl.replace(/\{@width\}|\{@height\}/g, '312').replace(/\{@quality\}/g, '70');
              if (id === productId) {
                addElementToDocument(productSelectors[i], 'image', image);
              }
            }
          }
        }
      }
      localStorage.setItem('prodCount', `${lastProductPosition + productSelectors.length}`);
    });
    stall(1500);
  });
  return await context.extract(productDetails, { transform });
}

module.exports = {
  implements: 'product/search/extract',
  parameterValues: {
    country: 'IN',
    store: 'flipkart',
    transform,
    domain: 'flipkart.com',
    zipcode: '',
  },
  implementation,
};



// var readLineSync = require('readline-sync');
// var score = 0;
// //for ease of use
// function print(data){
//   console.log(data);
// }

// //array of questions object
// var questionArray = [
//   {
//     question: "am I older than 25 years ? ",
//     answer: "NO",
//   },
//   {
//     question: "where I live ? ",
//     answer: "Latur",
//   },
//   {
//     question: "which stream I am studying ? ",
//     answer: "BCA",
//   },
//   {
//     question: "which college I go to (give short form as answer) ? ",
//     answer: "DCCL",
//   },
// ];

// //check score if it is greater than 0 before print 
// //it is used to print 0 isnsted of printing negative value
// function printScore(score){
//   if(score > 0){
//     print("Score: "+ score);
//   }else{
//     print("Score: 0");
//   }
// }
// //process quesitons according to user answer
// function processQuestion(question, answer){
//   var userAnswer = readLineSync.question(question);
//   if(userAnswer.toUpperCase() === answer.toUpperCase()){
//     print("OMG turuuu lob..! you know it");
//     score = score + 1;
//     printScore(score);
//     print("-----------------------------------");
//   }else{
//     print("WRONG..! don't worry you will meet and know me soon");
//     //using if condition as if score is 0 and if we substract it goes negative so next time score //increasing goes difficult
//     if(score > 0){
//       score = score - 1;
//     }
//     printScore(score);
//     print("-----------------------------------");
//   }
// }
// var userName= readLineSync.question("Hey!...What's your name? ");
// print("Welcome..."+ userName);
// print("Chalo shuru krte hai khela...");
// print("-----------------------------------");

// for(var i=0;i< questionArray.length; i++){
//   currentObject = questionArray[i];
//   processQuestion(currentObject.question, currentObject.answer);
// }

// print("You got overall "+ score +" out of 4");






