const botones = document.querySelector('input[name="toggle"]');
const url = document.getElementById("url");
const archivo = document.getElementById("customFileLangHTML");
const l_archivo = document.getElementById("l_customFileLangHTML");
archivo.style.display = "none";
l_archivo.style.display = "none";
botones.addEventListener("click", (e) => {
  const cbx = document.getElementById(`customSwitch_t`);
  const label_t = document.getElementById(`label_t`);

  console.log(archivo);
  if (cbx.checked) {
    label_t.innerHTML = "ARCHIVO";
    url.style.display = "none";
    archivo.style.display = "block";
    l_archivo.style.display = "block";
  } else {
    label_t.innerHTML = "URL";
    url.style.display = "block";
    archivo.style.display = "none";
    l_archivo.style.display = "none";
  }
});
