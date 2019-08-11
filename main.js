const xlabels = [];
const ylabels = [];
chart();

async function chart() {
  await getRepo();
  const ctx = document.getElementById("bar").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "stars",
          data: ylabels,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128, 0, 0, 0.2)",
            "rgba(25, 25, 112, 0.2)",
            "rgba(255, 215, 0, 0.2)",
            "rgba(60, 179, 112, 0.2)"
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(128, 0, 0, 1)",
            "rgba(25, 25, 112, 1)",
            "rgba(255, 215, 0, 1)",
            "rgba(60, 179, 112, 1)"
          ],
          borderWidth: 1
        }
      ]
    }
  });
}

async function getRepo() {
  const Repos = document.getElementById("Repos");
  const url =
    "https://api.github.com/search/repositories?q=stars:90000..1000000";
  const response = await fetch(url);
  const result = await response.json();
  console.log(result.items.length);

  while (result.items.length > 10) {
    result.items.pop();
  }

  result.items.forEach(i => {
    const anchor = document.createElement("a");
    const nameRepo = i.name;
    const starNum = i.stargazers_count;
    xlabels.push(nameRepo);
    ylabels.push(starNum);
    anchor.target = "_blank";
    anchor.href = i.html_url;
    anchor.textContent = nameRepo;

    // Repos.appendChild(anchor);
    // Repos.appendChild(document.createElement("br"));
  });
}
