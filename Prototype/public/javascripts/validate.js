function validate() {
    var schoolName = document.getElementById("schoolName").value;
    var error = "";
    if (schoolName == "") {
        error = "Missing University Name\n";
        alert(error);
        return false;
    }
    var schoolNameRE = /^[a-zA-Z\s]+$/; // has to be letter or space
    if (!schoolName.match(schoolNameRE)) {
        error = "Invalid University Name\n";
        alert(error);
        return false;
    }
    return true;
}
