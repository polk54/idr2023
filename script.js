function showVisualization(id) {
    const visualizations = document.getElementsByClassName('visualization');
    for (let vis of visualizations) {
        vis.classList.remove('active');
    }
    document.getElementById(id).classList.add('active');

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('#sidebar button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add 'active' class to the clicked button
    const activeButton = document.querySelector(`#sidebar button[onclick="showVisualization('${id}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    if (window.innerWidth <= 768) {
        // Always close the sidebar on mobile
        document.body.classList.remove('sidebar-open');
    }
}

function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

// 1.1 External Debt Stocks Chart
const externalDebtStocksCtx = document.getElementById('externalDebtStocksChart').getContext('2d');
new Chart(externalDebtStocksCtx, {
    type: 'bar',
    data: {
        labels: ['Low- and middle-income countries', 'China', 'Low- and middle-income countries (excluding China)', 'IDA-eligible countries', 'Low- and middle-income countries (excluding China and IDA-eligible countries)'],
        datasets: [{
            label: 'Average 2012 to 2019',
            data: [6, 10, 5, 10, 5],
            backgroundColor: '#6F9799',
        }, {
            label: '2021',
            data: [7, 16, 4, 10, 3],
            backgroundColor: '#89B140',
        }, {
            label: '2022',
            data: [-3, -12, 0, 3, 0],
            backgroundColor: '#006463',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Percent Change in External Debt Stocks of Low- and Middle-income Countries, 2012-22'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: function(value, index) {
                        const label = this.getLabelForValue(value);
                        const words = label.split(' ');
                        const lines = [];
                        let line = '';

                        for (let word of words) {
                            if (line.length + word.length <= 20) {
                                line += (line ? ' ' : '') + word;
                            } else {
                                lines.push(line);
                                line = word;
                            }
                        }
                        if (line) {
                            lines.push(line);
                        }

                        return lines;
                    },
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Percent'
                }
            }
        }
    }
});

// 1.2 Share of External Debt Stocks Chart
const externalDebtShareCtx = document.getElementById('externalDebtShareChart').getContext('2d');
new Chart(externalDebtShareCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Top ten countries, excluding China',
            data: [53, 51, 49, 51, 51, 49, 47, 46, 44, 42, 43],
            backgroundColor: '#6F9799',
        }, {
            label: 'China',
            data: [20, 23, 26, 21, 21, 23, 25, 26, 27, 29, 27],
            backgroundColor: '#89B140',
        }, {
            label: 'Other low- and middle-income countries',
            data: [27, 26, 25, 28, 28, 28, 28, 28, 29, 29, 30],
            backgroundColor: '#006463',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Share of External Debt Stocks of Low- and Middle-Income Countries, 2012-22'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Percent'
                },
                max: 100
            }
        }
    }
});

// B1.1.1 SDR Allocations Chart
const sdrAllocationsCtx = document.getElementById('sdrAllocationsChart').getContext('2d');
new Chart(sdrAllocationsCtx, {
    type: 'bar',
    data: {
        labels: ['East Asia and Pacific', 'Europe and Central Asia', 'Latin America and Caribbean', 'Middle East and North Africa', 'South Asia', 'Sub-Saharan Africa'],
        datasets: [{
            label: 'SDR / General Government External Debt Stock',
            data: [12, 14, 8, 12, 9, 8],
            backgroundColor: '#006463',
        }, {
            label: 'SDR / International Reserves',
            data: [2, 5, 8, 9, 5, 23],
            backgroundColor: '#89B140',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'SDR Allocations as a Share of General Government External Debt and International Reserves, by Region, 2022'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent'
                }
            }
        }
    }
});

// 1.3 Debt Composition Chart
const debtCompositionCtx = document.getElementById('debtCompositionChart').getContext('2d');
new Chart(debtCompositionCtx, {
    type: 'bar',
    data: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'PPG (incl. IMF)',
            data: [39.3, 36.1, 36.1, 34.7, 34.7, 37.7, 38.2, 38.9, 39.3, 40.1, 41.6, 42.1, 43.0],
            backgroundColor: '#006463',
        }, {
            label: 'PNG',
            data: [33.7, 34.9, 35.6, 34.8, 34.9, 37.5, 38.7, 35.8, 34.1, 34.0, 33.6, 31.7, 30.8],
            backgroundColor: '#89B140',
        }, {
            label: 'Short-term',
            data: [27.0, 29.0, 28.3, 30.5, 30.5, 24.9, 23.1, 25.3, 26.6, 25.8, 24.8, 26.3, 26.2],
            backgroundColor: '#6F9799',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Percent'
                },
                max: 100
            }
        }
    }
});

// 1.4 Creditor Composition Chart
const creditorCompositionCtx = document.getElementById('creditorCompositionChart').getContext('2d');
new Chart(creditorCompositionCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Bilateral creditors',
            data: [102.6, 109.9, 118.6, 128.0, 137.8, 154.6, 170.6, 185.4, 203.8, 214.0, 213.2],
            borderColor: '#6F9799',
            backgroundColor: '#6F9799',
            fill: false,
        }, {
            label: 'Multilateral creditors (incl. IMF)',
            data: [172.9, 179.0, 180.0, 185.5, 193.2, 219.5, 230.4, 253.2, 304.1, 345.5, 362.5],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Bondholders',
            data: [10.3, 15.9, 28.4, 35.0, 38.9, 50.8, 65.0, 71.9, 75.4, 89.5, 88.6],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'Other private creditors',
            data: [20.5, 26.7, 29.9, 33.9, 35.3, 45.3, 49.4, 54.1, 63.5, 67.2, 63.7],
            borderColor: '#D6D87E',
            backgroundColor: '#D6D87E',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// 1.5 Debt-to-GNI Ratios Chart
const debtToGNICtx = document.getElementById('debtToGNIChart').getContext('2d');
new Chart(debtToGNICtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Low-income countries',
            data: [29, 35, 34, 37, 37, 37, 46, 46, 51, 50, 45],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'Middle-income countries',
            data: [23, 24, 25, 25, 25, 26, 26, 26, 28, 26, 24],
            borderColor: '#6F9799',
            backgroundColor: '#6F9799',
            fill: false,
        }, {
            label: 'IDA-eligible countries',
            data: [25, 26, 26, 28, 29, 33, 34, 35, 40, 40, 39],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent'
                }
            }
        }
    }
});

// B1.4.1 Number of Low- and Middle-Income Countries Chart
const countriesCountCtx = document.getElementById('countriesCountChart').getContext('2d');
new Chart(countriesCountCtx, {
    type: 'bar',
    data: {
        labels: ['IDA-only countries', 'Blend countries', 'IBRD countries'],
        datasets: [{
            label: 'Low-income',
            data: [24, 0, 0],
            backgroundColor: '#006463',
        }, {
            label: 'Middle-income',
            data: [30, 15, 52],
            backgroundColor: '#89B140',
        }, {
            label: 'High-income',
            data: [1, 0, 0],
            backgroundColor: '#9E95A0',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure B1.4.1 Number of Low- and Middle-Income Countries and Guyana Covered in the International Debt Report 2023, by FY2024 Income and Lending Groups',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                position: 'top',
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Number'
                },
            }
        }
    }
});

// 1.6 Debt and GNI by Group Chart
const debtAndGNIByGroupCtx = document.getElementById('debtAndGNIByGroupChart').getContext('2d');
new Chart(debtAndGNIByGroupCtx, {
    type: 'bar',
    data: {
        labels: ['IDA-eligible', 'IBRD-only (excluding China)', 'Low- and middle-income (excluding China)', 'Low-income', 'Lower middle-income', 'Upper middle-income (excluding China)'],
        datasets: [{
            label: 'External Debt Stock',
            data: [134, 36, 46, 109, 89, 28],
            backgroundColor: '#006463',
        }, {
            label: 'GNI',
            data: [53, 17, 21, 33, 48, 7],
            backgroundColor: '#89B140',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent change'
                }
            }
        }
    }
});

// 1.7 Debt and GNI by Region Chart
const debtAndGNIByRegionCtx = document.getElementById('debtAndGNIByRegionChart').getContext('2d');
new Chart(debtAndGNIByRegionCtx, {
    type: 'bar',
    data: {
        labels: ['East Asia & Pacific (excluding China)', 'Europe & Central Asia', 'Latin America & Caribbean', 'Middle East & North Africa', 'South Asia', 'Sub-Saharan Africa'],
        datasets: [{
            label: 'External Debt Stock',
            data: [61, 1, 54, 95, 73, 96],
            backgroundColor: '#006463',
        }, {
            label: 'GNI',
            data: [46, 6, -1, -3, 88, 23],
            backgroundColor: '#89B140',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent change'
                }
            }
        }
    }
});

// 1.8 Debt and Exports Chart
const debtAndExportsCtx = document.getElementById('debtAndExportsChart').getContext('2d');
new Chart(debtAndExportsCtx, {
    type: 'bar',
    data: {
        labels: ['IDA-eligible', 'IBRD-only (excluding China)', 'Low & middle income (excluding China)', 'Low income', 'Lower middle income', 'Upper middle income (excluding China)'],
        datasets: [{
            label: 'External Debt Stock',
            data: [134, 36, 46, 109, 89, 28],
            backgroundColor: '#006463',
        }, {
            label: 'Exports',
            data: [36, 37, 37, 50, 45, 32],
            backgroundColor: '#89B140',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent change'
                }
            }
        }
    }
});

// 1.9 Debt Service Chart
const debtServiceCtx = document.getElementById('debtServiceChart').getContext('2d');
new Chart(debtServiceCtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Interest payments',
            data: [6, 8, 8, 10, 12, 15, 18, 22, 18, 20, 24],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: true,
        }, {
            label: 'Total debt service',
            data: [26, 32, 39, 33, 44, 51, 60, 81, 65, 85, 89],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// 1.10 Net Debt Inflows Chart
const netDebtInflowsCtx = document.getElementById('netDebtInflowsChart').getContext('2d');
new Chart(netDebtInflowsCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Long-term',
            data: [488.6, 465.6, 406.0, 177.3, 279.3, 438.1, 356.6, 334.9, 373.3, 264.3, -94.5],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Short-term',
            data: [123.9, 360.3, 135.9, -500.4, -48.4, 333.4, 212.8, 34.1, 7.1, 291.4, -90.6],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }       
});
// B1.3.1 Net Financial Flows to China Chart
const netFinancialFlowsCtx = document.getElementById('netFinancialFlowsChart').getContext('2d');
new Chart(netFinancialFlowsCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Net debt inflows',
            data: [72.3, 328.7, 261.2, -392.6, 10.0, 317.8, 275.3, 144.0, 210.4, 344.7, -296.8],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Net equity inflows',
            data: [244.4, 298.0, 262.7, 226.7, 188.3, 176.8, 246.6, 207.2, 301.1, 383.5, 194.1],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// 1.11 Bond Flows Chart
const bondFlowsCtx = document.getElementById('bondFlowsChart').getContext('2d');
new Chart(bondFlowsCtx, {
    type: 'bar',
    data: {
        labels: ['PPG Net flows', 'PPG Amortization', 'PPG Disbursements', 'PNG Net flows', 'PNG Amortization', 'PNG Disbursements'],
        datasets: [{
            label: '2021',
            data: [28.2, -115.4, 143.7, 23.3, -50.3, 73.6],
            backgroundColor: '#89B140',
        }, {
            label: '2022',
            data: [-35.3, -105.0, 69.7, -20.6, -52.4, 31.8],
            backgroundColor: '#006463',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// 1.12 Net Flows Chart
const netFlowsCtx = document.getElementById('netFlowsChart').getContext('2d');
new Chart(netFlowsCtx, {
    type: 'bar',
    data: {
        labels: ['Bilateral', 'Multilateral (incl. IMF)', 'Bondholders', 'Other Private Creditors'],
        datasets: [{
            label: 'East Asia & Pacific',
            data: [1.2, 1.2, 0.4, -0.9],
            backgroundColor: '#D3D3D3',
        }, {
            label: 'Europe & Central Asia',
            data: [0.0, 3.2, 0.0, 3.4],
            backgroundColor: '#D6D87E',
        }, {
            label: 'Latin America & Caribbean',
            data: [0.4, 1.2, -0.2, -0.1],
            backgroundColor: '#89B140',
        }, {
            label: 'Middle East & North Africa',
            data: [0.0, 0.0, 0.0, 0.0],
            backgroundColor: '#FFD700',
        }, {
            label: 'South Asia',
            data: [5.8, 8.2, -1.2, -3.0],
            backgroundColor: '#6F9799',
        }, {
            label: 'Sub-Saharan Africa',
            data: [0.4, 16.6, 0.1, 7.6],
            backgroundColor: '#006463',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 1.12: Net Flows to IDA-Eligible Countries, by Region and Creditor Type, 2022',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
                suggestedMax: 35,
            }
        }
    }
});

// 1.13 Net Equity Inflows and External Debt Flows Chart
const netEquityInflowsCtx = document.getElementById('netEquityInflowsChart').getContext('2d');
new Chart(netEquityInflowsCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Foreign Direct Investment',
            data: [539, 565, 494, 488, 454, 456, 483, 488, 462, 665, 479],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Portfolio equity',
            data: [97, 69, 83, 21, 45, 67, 38, 48, 61, 58, 11],
            borderColor: '#6F9799',
            backgroundColor: '#6F9799',
            fill: false,
        }, {
            label: 'Private nonguaranteed debt flows',
            data: [269, 254, 204, 61, 140, 158, 110, 121, 116, 85, -145],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'Public and publicly guaranteed debt flows',
            data: [226, 223, 204, 109, 133, 275, 216, 193, 212, 178, 37],
            borderColor: '#D6D87E',
            backgroundColor: '#D6D87E',
            fill: false,
        }, {
            label: 'Short-term debt flows',
            data: [124, 360, 136, -500, -48, 333, 213, 34, 7, 291, -91],
            borderColor: '#9E95A0',
            backgroundColor: '#9E95A0',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// 1.14 Loan Commitments Chart
const loanCommitmentsCtx = document.getElementById('loanCommitmentsChart').getContext('2d');
new Chart(loanCommitmentsCtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'IDA Eligible',
            data: [52.2, 61.4, 71.9, 64.7, 77.9, 92.8, 83.0, 88.1, 86.3, 96.2, 67.1],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'IBRD-only Borrowers',
            data: [330.0, 339.8, 324.6, 323.1, 345.3, 390.1, 474.4, 383.9, 462.0, 386.4, 305.1],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'US$ (billion)'
                }
            }
        }
    }
});

// B1.5.1 IDA Gross and Net Inflows Chart
const idaInflowsCtx = document.getElementById('idaInflowsChart').getContext('2d');
new Chart(idaInflowsCtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Gross disbursements',
            data: [7.9, 9.1, 10.3, 10.4, 9.5, 11.4, 13.6, 16.4, 20.1, 19.5, 23.1],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'Net flow',
            data: [6.5, 7.8, 9.1, 9.1, 8.0, 9.9, 11.9, 14.5, 17.5, 15.8, 19.7],
            borderColor: '#9E95A0',
            backgroundColor: '#9E95A0',
            fill: false,
        }, {
            label: 'Net transfer',
            data: [5.9, 7.3, 8.5, 8.5, 7.4, 9.2, 11.0, 13.5, 16.3, 14.2, 18.3],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure B1.5.1 IDA Gross and Net Inflows of Credits and Grants to IDA-Eligible Countries, 2012-22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
            }
        }
    }
});
// 1.15 New Commitments from Multilateral Creditors Chart
const multilateralCommitmentsCtx = document.getElementById('multilateralCommitmentsChart').getContext('2d');
new Chart(multilateralCommitmentsCtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'World Bank (IDA + IBRD)',
            data: [33.59, 25.05, 36.38, 34.52, 39.89, 35.07, 36.36, 34.81, 48.39, 52.81, 53.55],
            backgroundColor: '#006463',
            borderColor: '#006463',
            fill: true,
        }, {
            label: 'Regional Banks (ADB + AFDB+ IDB)',
            data: [23.81, 24.21, 25.17, 24.97, 25.44, 30.25, 31.13, 32.83, 46.81, 29.11, 26.87],
            backgroundColor: '#89B140',
            borderColor: '#89B140',
            fill: true,
        }, {
            label: 'Other multilaterals',
            data: [19.16, 17.14, 22.52, 20.11, 22.47, 22.45, 24.76, 23.23, 44.13, 32.14, 35.28],
            backgroundColor: '#D6D87E',
            borderColor: '#D6D87E',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 1.15 New Commitments from Multilateral Creditors to IDA-Eligible and IBRD-Only Countries, 2012-22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
            }
        }
    }
});


// 1.16 New Commitments from Bilateral Creditors Chart
const bilateralCommitmentsCtx = document.getElementById('bilateralCommitmentsChart').getContext('2d');
new Chart(bilateralCommitmentsCtx, {
    type: 'line',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Japan',
            data: [13.11, 14.15, 14.81, 14.73, 13.47, 14.07, 13.57, 9.58, 16.11, 8.81, 11.12],
            backgroundColor: '#006463',
            borderColor: '#006463',
            fill: true,
        }, {
            label: 'Other Paris Club creditors',
            data: [23.09, 12.35, 23.63, 37.64, 27.63, 18.81, 9.82, 17.08, 18.60, 14.73, 14.62],
            backgroundColor: '#6F9799',
            borderColor: '#6F9799',
            fill: true,
        }, {
            label: 'China',
            data: [17.72, 19.56, 29.48, 18.51, 27.42, 30.94, 20.91, 14.27, 6.44, 9.64, 5.68],
            backgroundColor: '#89B140',
            borderColor: '#89B140',
            fill: true,
        }, {
            label: 'Other non Paris Club creditors (excl. China)',
            data: [12.81, 13.20, 7.72, 9.55, 16.09, 9.96, 4.63, 11.58, 7.68, 8.46, 7.12],
            backgroundColor: '#D6D87E',
            borderColor: '#D6D87E',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 1.16 New Commitments from Bilateral Creditors to IDA-Eligible and IBRD-Only Countries, 2012-22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
            }
        }
    }
});

// 1.17 Percent Share of Loan Commitments Chart
const loanCommitmentsShareCtx = document.getElementById('loanCommitmentsShareChart').getContext('2d');
new Chart(loanCommitmentsShareCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Bilateral',
            data: [43.20, 46.37, 39.75, 38.72, 53.88, 30.06, 26.44, 31.78, 22.81, 21.06, 21.22],
            backgroundColor: '#6F9799',
        }, {
            label: 'Multilateral',
            data: [41.44, 34.37, 33.80, 41.93, 34.70, 40.34, 39.88, 39.82, 51.72, 43.25, 64.31],
            backgroundColor: '#006463',
        }, {
            label: 'Bondholders',
            data: [4.67, 7.85, 16.55, 11.43, 4.57, 14.80, 20.33, 14.93, 6.77, 20.03, 4.66],
            backgroundColor: '#89B140',
        }, {
            label: 'Other Private',
            data: [10.69, 11.41, 9.90, 7.92, 6.85, 14.79, 13.35, 13.47, 18.70, 15.66, 9.80],
            backgroundColor: '#9E95A0',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 1.17 Percent Share of Loan Commitments by Creditor Type to IDA-Eligible Countries, 2012-22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Percent'
                },
                max: 100
            }
        }
    }
});

// B1.7.1 Low- and Middle-Income Countries' Debt to China Chart
const debtToChinaCtx = document.getElementById('debtToChinaChart').getContext('2d');
new Chart(debtToChinaCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'East Asia & Pacific',
            data: [10.2, 12.5, 14.5, 15.4, 15.9, 17.3, 18.1, 18.2, 20.6, 20.4, 19.2],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Europe & Central Asia',
            data: [10.2, 13.8, 15.0, 16.2, 16.4, 17.2, 18.2, 18.4, 17.7, 17.6, 17.1],
            borderColor: '#6F9799',
            backgroundColor: '#6F9799',
            fill: false,
        }, {
            label: 'Latin America & Caribbean',
            data: [11.6, 13.9, 14.9, 15.1, 16.6, 23.8, 22.9, 17.1, 16.0, 15.0, 13.5],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
            fill: false,
        }, {
            label: 'Middle East & North Africa',
            data: [3.8, 3.7, 3.6, 3.6, 5.5, 5.9, 7.5, 7.4, 7.6, 7.5, 7.9],
            borderColor: '#D6D87E',
            backgroundColor: '#D6D87E',
            fill: false,
        }, {
            label: 'South Asia',
            data: [6.4, 8.5, 10.5, 11.6, 13.7, 18.0, 28.5, 33.1, 37.7, 44.8, 42.9],
            borderColor: '#9E95A0',
            backgroundColor: '#9E95A0',
            fill: false,
        }, {
            label: 'Sub-Saharan Africa',
            data: [24.2, 32.1, 42.1, 47.1, 60.5, 68.4, 74.3, 80.2, 82.1, 82.7, 80.3],
            borderColor: '#F1D312',
            backgroundColor: '#F1D312',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure B1.7.1 Low- and Middle-Income Countries Debt to China, by Region, 2012–22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
            }
        }
    }
});

// B1.7.2 Commitments from China Chart
const commitmentsFromChinaCtx = document.getElementById('commitmentsFromChinaChart').getContext('2d');
new Chart(commitmentsFromChinaCtx, {
    type: 'bar',
    data: {
        labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'East Asia & Pacific',
            data: [3.2, 1.9, 2.1, 1.0, 4.0, 1.4, 1.2, 0.5, 0.6, 0.4, 2.1],
            borderColor: '#006463',
            backgroundColor: '#006463',
        }, {
            label: 'Europe & Central Asia',
            data: [3.3, 2.5, 3.2, 2.5, 3.9, 2.2, 2.7, 3.8, 0.4, 0.8, 0.6],
            borderColor: '#6F9799',
            backgroundColor: '#6F9799',
        }, {
            label: 'Latin America & Caribbean',
            data: [2.1, 1.4, 7.7, 0.7, 4.4, 10.9, 1.4, 0.4, 0.1, 0, 0],
            borderColor: '#89B140',
            backgroundColor: '#89B140',
        }, {
            label: 'Middle East & North Africa',
            data: [0.3, 0.8, 0.3, 0.2, 2.1, 1.2, 1.7, 3.5, 0.6, 0.9, 0.3],
            borderColor: '#D6D87E',
            backgroundColor: '#D6D87E',
        }, {
            label: 'South Asia',
            data: [2.3, 1.5, 5.1, 5.8, 7.6, 5.5, 8.3, 5.6, 4.9, 8.3, 2.2],
            borderColor: '#9E95A0',
            backgroundColor: '#9E95A0',
        }, {
            label: 'Sub-Saharan Africa',
            data: [6.5, 16.3, 13.3, 9.7, 29.6, 14.3, 12.3, 4.7, 2.7, 2.0, 0.1],
            borderColor: '#F1D312',
            backgroundColor: '#F1D312',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure B1.7.2 Commitments from China to Low- and Middle-Income Countries, by Region, 2012-22',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'US$ (billion)'
                },
            }
        }
    }
});

// 2.1 Percent Change in Gross Domestic Product Growth Chart
const gdpGrowthCtx = document.getElementById('gdpGrowthChart').getContext('2d');
new Chart(gdpGrowthCtx, {
    type: 'line',
    data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'World',
            data: [3.2, 2.6, -3.1, 6.0, 3.1, 2.1, 2.4],
            borderColor: '#006463',
            backgroundColor: '#006463',
            fill: false,
        }, {
            label: 'Low- and middle-income countries',
            data: [4.9, 4.0, -1.2, 7.1, 3.4, 4.2, 4.0],
            borderColor: '#F5971E',
            backgroundColor: '#F5971E',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 2.1. Percent Change in Gross Domestic Product Growth, 2018-24',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percent'
                },
            }
        }
    }
});

// 2.2 Changes in External Debt-to-GNI Chart
const debtToGNIChangesCtx = document.getElementById('debtToGNIChangesChart').getContext('2d');
new Chart(debtToGNIChangesCtx, {
    type: 'bar',
    data: {
        labels: ['Low- and middle-income countries', 'Low-income countries', 'IDA-eligible countries'],
        datasets: [{
            label: '1970-89',
            data: [1.2, 2.8, 2.691],
            backgroundColor: '#9E95A0',
        }, {
            label: '1990-2001',
            data: [0.3, 0.9, -0.815],
            backgroundColor: '#6F9799',
        }, {
            label: '2002-09',
            data: [-1.9, -5.1, -4.412],
            backgroundColor: '#89B140',
        }, {
            label: '2010-22',
            data: [0.2, 2.3, 1.339],
            backgroundColor: '#006463',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Figure 2.2 Changes in External Debt-to-GNI, 1970-2022',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                position: 'top',
            }
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
                title: {
                    display: true,
                    text: 'Percent'
                },
            }
        }
    }
});

// 2.3 Composition of Government Expenditures Chart
const govtExpendituresCtx = document.getElementById('govtExpendituresChart').getContext('2d');
new Chart(govtExpendituresCtx, {
    type: 'bar',
    data: {
        labels: ['Low- and middle-income countries 2010s', 'Low- and middle-income countries 2020s', 'Low-income countries 2010s', 'Low-income countries 2020s'],
        datasets: [{
            label: 'Compensation',
            data: [27, 27, 32, 41],
            backgroundColor: '#006463',
        }, {
            label: 'Interest',
            data: [12, 11, 5, 9],
            backgroundColor: '#89B140',
        }, {
            label: 'Social benefits',
            data: [27, 27, 3, 5],
            backgroundColor: '#9E95A0',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 2.3. Composition of government expenditures',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Percent of government expense'
                },
                max: 100
            }
        }
    }
});

// 3.1 Policy Performance Actions Chart
const policyPerformanceCtx = document.getElementById('policyPerformanceChart').getContext('2d');
new Chart(policyPerformanceCtx, {
    type: 'bar',
    data: {
        labels: ['FY21', 'FY22', 'FY23'],
        datasets: [{
            label: 'Debt Transparency',
            data: [42, 42, 27],
            backgroundColor: '#006463',
        }, {
            label: 'Debt Management',
            data: [53, 53, 62],
            backgroundColor: '#89B140',
        }, {
            label: 'Fiscal Sustainability',
            data: [35, 46, 58],
            backgroundColor: '#9E95A0',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Figure 3.1: Policy Performance Actions 1 July 2020 to 30 June 2023',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Number of PPAs'
                },
            }
        }
    }
});

// Add event listeners to sidebar buttons
document.querySelectorAll('#sidebar button').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        showVisualization(targetId);
    });
});

// Initialize the dashboard by showing the first visualization
showVisualization('externalDebtStocks');
document.querySelector('#sidebar button').classList.add('active');