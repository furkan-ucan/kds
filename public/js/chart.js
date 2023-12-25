const dataSource = {
    chart: {
        caption: "Müşteri Sayısı (Ülkelere ve Şehirlere Göre)",
        subcaption: "Otelimize gelen müşterilerin ülkelerine ve şehirlerine göre dağılımı",
        theme: "candy",
        numbersuffix: " kişi",
        nodewidth: 0,
        nodelinkpadding: 3,
        linkcolor: "blend",
        linkcurvature: 0.6,
        linkalpha: 40
    },
    nodes: [
        { label: "Almanya" },
        { label: "Fransa" },
        { label: "Amerika" },
        // Diğer ülkeler...
        { label: "Türkiye" },
        { label: "İstanbul" },
        { label: "Ankara" },
        { label: "İzmir" },
        // Diğer Türkiye şehirleri...
    ],
    links: [
        { from: "Almanya", to: "Türkiye", value: 100 },
        { from: "Fransa", to: "Türkiye", value: 80 },
        { from: "Amerika", to: "Türkiye", value: 70 },
        // Diğer ülkelerden gelen müşteri sayıları...
        { to: "Türkiye", from: "İstanbul", value: 150 },
        { to: "Türkiye", from: "Ankara", value: 120 },
        { to: "Türkiye", from: "İzmir", value: 100 },
        // Diğer Türkiye şehirlerine gelen müşteri sayıları...
    ]
};

FusionCharts.ready(function () {
    var myChart = new FusionCharts({
        type: "sankey",
        renderAt: "chart-container2",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
    }).render();
});