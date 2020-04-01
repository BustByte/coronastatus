<?php

// config
$fileWithLotsOfWords = 'fileWithLotsOfWords.txt'; // file with single word in row
$howManyWordsWeNeed = getRandomCount(getConfig('PASSCODE_LENGTH'));
$country_code = getConfig('COUNTRY_CODE');

// generator
$fileImWorkWith = fopen($fileWithLotsOfWords, "r");
if ($fileImWorkWith) {
    $howManyLotsMean = 0;
    while (($wordsHaystack[] = fgets($fileImWorkWith)) !== false) {
        $howManyLotsMean++;
    }

    $thisWordsWeNeed = [];
    $thisWordsWeAlreadyUse = [];
    while(count($thisWordsWeNeed) < $howManyWordsWeNeed){
        $tryThisWord = $wordsHaystack[rand(0, $howManyLotsMean)];
        if(!in_array($tryThisWord, $thisWordsWeAlreadyUse)){
            $thisWordsWeNeed[] = $tryThisWord;
            $thisWordsWeAlreadyUse[] = $tryThisWord;
        }
    }
    sort($thisWordsWeNeed);

    fclose($fileImWorkWith);

    $fileImWorkWith = fopen($country_code.'-word-list.txt', "w+");
    foreach($thisWordsWeNeed as $theWord){
        fwrite($fileImWorkWith, $theWord);
    }

    fclose($fileImWorkWith);
    echo 'File has been created in root folder, just copy it :-)';
} else {
    echo 'error';
}

function getConfig($configkey){
    $config = [];
    $fileImWorkWith = file_get_contents('./config.json', "r");
    if($fileImWorkWith !== false) {
        $jsonContent = json_decode($fileImWorkWith);
        foreach ($jsonContent as $key => $value) {
            $config[$key] = $value;
        }
    }
    return $config[$configkey];
}

function getRandomCount($noOfDigits){
    $return = '1' . rand(pow(10, $noOfDigits - 1), pow(10, $noOfDigits) - 1);
    if($noOfDigits == 3){
        $return .= rand(0,9);
    } else {
        $return = (int)substr($return, 0,-1);
    }
    return $return;
}

