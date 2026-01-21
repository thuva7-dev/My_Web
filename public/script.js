function getData() {
  fetch("/api/hello")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data.message);
    });
}
