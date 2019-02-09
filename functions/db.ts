import { Game, Question, Category } from '../src/app/model';
import { ESUtils } from './ESUtils';

const functions = require('firebase-functions');

exports.onQuestionWrite = functions.database.ref('/questions/published/{questionId}').onWrite((change, context) => {
  //console.log(event.params.questionId);
  //console.log(event.params);
  //console.log(event.data);
  // console.log(event, "event after question save ts file");

  //let esUtils = new ESUtils();
  //getCategories().then(function (categories: Category[]) {
    //console.log(categories);
    const originalVal = change.after.val()
    if (change.after.exists())
        //add or update
        ESUtils.createOrUpdateIndex(ESUtils.QUESTIONS_INDEX, originalVal.categoryIds["0"], originalVal, context.params.questionId);
    else
        //delete
        ESUtils.removeIndex(ESUtils.QUESTIONS_INDEX, context.params.questionId);
  //});
});

