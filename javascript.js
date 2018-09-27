
var config = {
    apiKey: "AIzaSyB-gchDCtRKtWEopBSRbu0HuIMVS1yYW6s",
    authDomain: "my-project-ed37c.firebaseapp.com",
    databaseURL: "https://my-project-ed37c.firebaseio.com",
    projectId: "my-project-ed37c",
    storageBucket: "my-project-ed37c.appspot.com",
    messagingSenderId: "625568993024"
};
firebase.initializeApp(config);
var train = firebase.database().ref("/trains")

$("#add-train").on("click", function (event) {
    event.preventDefault();

    var trains = {
        name: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        time: $("#start-time").val().trim(),
        freq: $("#frequency").val().trim(),
    };
    train.push(trains);

});

train.on("child_added", function(snap){
    var frequencyMin = snap.val().freq;

    var startTime = snap.val().time;

    var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(startTimeConverted), "minutes");

    var remainder  = timeDifference % frequencyMin;

    var minutesAway = frequencyMin - remainder;

    var nextArrival = moment(moment().add(minutesAway, "minutes")).format("hh:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(snap.val().name),
        $("<td>").text(snap.val().destination),
        $("<td>").text(snap.val().freq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );
    $("#table-body").append(newRow);
});

