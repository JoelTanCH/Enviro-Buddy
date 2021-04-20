<script>
import { Bar } from "vue-chartjs";
import database from "../firebase.js";

export default {
  extends: Bar,
  mounted() {
    let data = {
      datasets: [
        {
          label: "Number of Events Approved",
          data: [],
          backgroundColor: "#D9EAD3",
        },
      ],
      labels: [],
    };

    let options = {
      legend: { display: false },
      title: {
        display: true,
        text: "Number of events Approved for each category",
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25,
            },
          },
        ],
      },
    };

    database
      .collection("eve-categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let category = doc.data();
          data.labels.push(category.name);
          data.datasets[0].data.push(category.count);
        });
      })
      .then(() => this.renderChart(data, options));
  },
};
</script>
