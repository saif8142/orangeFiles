document.getElementById("imgSelect").onclick = function (e) {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myimg").src = reader.result;

        }
        reader.readAsDataURL(files[0]);
        console.log(files[0])
    }
    input.click();
}