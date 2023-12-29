const dataSource = {
    chart: {
        caption: "Largest International migrations (In Millions)",
        subcaption:
            "A No-Node Sankey where the entities are just represented by the labels.",
        theme: "candy",
        numbersuffix: " Million",
        nodewidth: 0,
        nodelinkpadding: 3,
        linkcolor: "blend",
        linkcurvature: 0.6,
        linkalpha: 40
    },
    nodes: [
        {
            label: "Mexico"
        },
        {
            label: "United States of America"
        },
        {
            label: "India"
        },
        {
            label: "United Arab Emirates"
        },
        {
            label: "Turkey"
        },
        {
            label: "Russian Federation"
        },
        {
            label: "Ukraine"
        },
        {
            label: "Syrian Arab Republic"
        },
        {
            label: "Bangladesh"
        },
        {
            label: "Kazakhstan"
        },
        {
            label: "China"
        },
        {
            label: "Hong Kong"
        },
        {
            label: "Afghanistan"
        },
        {
            label: "Iran"
        },
        {
            label: "Saudi Arabia"
        },
        {
            label: "Philippines"
        },
        {
            label: "State of Palestine"
        },
        {
            label: "Jordan"
        }
    ],
    links: [
        {
            from: "India",
            to: "United Arab Emirates",
            value: 3.3
        },
        {
            from: "Mexico",
            to: "United States of America",
            value: 2.7
        },
        {
            from: "Russian Federation",
            to: "Ukraine",
            value: 3.3
        },
        {
            from: "Syrian Arab Republic",
            to: "Turkey",
            value: 3.3
        },
        {
            from: "Bangladesh",
            to: "India",
            value: 3.1
        },
        {
            from: "Kazakhstan",
            to: "Russian Federation",
            value: 2.6
        },
        {
            from: "China",
            to: "United States of America",
            value: 2.4
        },
        {
            from: "China",
            to: "Hong Kong",
            value: 1.3
        },
        {
            from: "Afghanistan",
            to: "Iran",
            value: 2.3
        },
        {
            from: "Mexico",
            to: "United States",
            value: 12.7
        },
        {
            from: "India",
            to: "United States of America",
            value: 2.3
        },
        {
            from: "India",
            to: "Saudi Arabia",
            value: 2.3
        },
        {
            from: "Philippines",
            to: "United States of America",
            value: 2.1
        },
        {
            from: "State of Palestine",
            to: "Jordan",
            value: 2
        }
    ]
};

FusionCharts.ready(function () {
    var myChart = new FusionCharts({
        type: "sankey",
        renderAt: "chart-container",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
    }).render();
});



