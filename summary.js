const model = await tf.loadLayersModel('model/model.json');

var text = 'temp@123'

const MAX_SEQUENCE_LENGTH = 100;

function word_preprocessor(word) {
  word = word.replace(/[-|.|,|\?|\!]+/g, '');
  word = word.replace(/\d+/g, '1');
  word = word.toLowerCase();
  if (word != '') {
    return word;
  } else {
    return '.'
  }
};

function make_sequences(words_array) {
  let sequence = Array();
  words_array.slice(0, MAX_SEQUENCE_LENGTH).forEach(function(word) {
    word = word_preprocessor(word);
    let id = words_vocab[word];
    if (id == undefined) {
      sequence.push(words_vocab['<UNK>']);
    } else {
      sequence.push(id);
    }  
  });

  // pad sequence
  if (sequence.length < MAX_SEQUENCE_LENGTH) {
    let pad_array = Array(MAX_SEQUENCE_LENGTH - sequence.length);
    pad_array.fill(words_vocab['<UNK>']);
    sequence = sequence.concat(pad_array);
  }

  return sequence;
};

function sum(str){
    let words = str.val().split(' ');
    let sequence = make_sequences(words);
    let tensor = tf.tensor1d(sequence, dtype='int32').expandDims(0);
    let [predictions, attention_probs] = await emodel.predict(tensor);
    attention_probs = await attention_probs.data();
    
    predictions = await predictions.argMax(-1).data();
    let predictions_tags = Array();
    predictions.forEach(function(tagid) {
        predictions_tags.push(getKey(tags_vocab, tagid));
    });

    words.forEach(function(word, index) {
        $(".results").append(word+' - '+predictions_tags[index]+' - '+attention_probs[index]+'</br>');
    });
    return words;
}