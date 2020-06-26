function init() {

  d3.json("samples.json").then(function(data) {

    console.log(data)

    d3.select("#selDataset").selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d)

    var patientId = d3.select("#selDataset").property("value")
    var names = data.names
    var metaData = data.metadata
    var samples = data.samples
        
    console.log(patientId)
    console.log(names)
    console.log(metaData)
    console.log(samples)
    
    // get meta data for patient demographic chart
    var patientIdMetaData = metaData.filter(d => d.id == patientId)
    var patientEthnicity = patientIdMetaData.ethnicity
    var patientGender = patientIdMetaData.gender
    var patientAge = patientIdMetaData.age
    var patientLocation = patientIdMetaData.location
    var patientBbtype = patientIdMetaData.bbtype
    var patientWfreq = patientIdMetaData.wfreq

    console.log(patientIdMetaData)
    console.log(patientEthnicity)

    // Get patient sample data
    var patientIdSampleData = samples.filter(d => d.id == patientId)
    var patientIdOtuIds = patientIdSampleData.otu_ids
    var patientId10OtuIds = patientIdOtuIds.slice(0, 10)
    var patientIdSampleValues = patientIdSampleData.sample_values
    var patientId10SampleValues = patientIdSampleValues.slice(0, 10)
    var patientIdSampleOtuLabels = patientIdSampleData.otu_labels

    console.log(patientIdSampleData)
    console.log(patientId10OtuIds)
  })
}

init();

// Creating Demographic Information Chart
    // "ID: "patientId
    // "Ethnicity: "patientEthnicity
    // "Gender: "patientGender
    // "Age: "patientAge
    // "Location: "patientLocation
    // "bbtype: " patientBbtype
    // "Wash Freq/Wk: " patientWfreq


// Creating a horizontal bar chart - how do I use the variables above in the bar chart calculations below

// var barChartData = [{
//     type: 'bar',
//     x: [patientId10OtuIds],
//     y: [patientId10SampleValues],
//     orientation: 'h'
//   }];
  
//   Plotly.newPlot('myDiv', barChartData); - what do I make the div reference for insert

// Creating Frequency Chart

// var frequencyChartData = [
//     {
//       domain: { x: [0, 1], y: [0, 1] },
//       value: patientWfreq,
//       title: { text: "Belly Button Washing Frequency" },
//       type: "indicator",
//       mode: "gauge+number+delta",
//       delta: { reference: 380 },  - what is this?
//       gauge: {
//         axis: { range: [null, 9] },
//         steps: [
//           { range: [0, 1], color: rgb(203,24,29) },
//           { range: [1, 2], color: rgb(239,59,44) },
//           { range: [2, 3], color: rgb(251,106,74) },
//           { range: [3, 4], color: rgb(247,252,185) },
//           { range: [4, 5], color: rgb(217, 240, 163) },
//           { range: [5, 6], color: rgb(173, 221, 142) },
//           { range: [6, 7], color: rgb(120, 198, 121) },
//           { range: [7, 8], color: rgb(65, 171, 93) },
//           { range: [8, 9], color: rgb(35, 132, 67) },
//         ]
//         }
//       }
//     }
//   ];
  
//   var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
//   Plotly.newPlot('myDiv', frequencyChartData, layout); - what do I make the div reference for insert



// // Creating Bubble Chart
// // Do I need to make a for loop to show a different pop up text for each observation

// for (var i = 0; i < patientIdOtuIds.length; i++) 

// var trace1 = {
//     x: [patientIdOtuIds],
//     y: [patientIdSampleValues],
//     text: [patientIdOtuIds, patientIdSampleValues], 
//     mode: 'markers',
//     marker: {
//       color: [], - need to make it a sliding scale
//       size: [patientIdSampleValues/10]
//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: Patient Sample Observations,
//     showlegend: false,
//     height: 600,
//     width: 600
//   };
  
//   Plotly.newPlot('myDiv', data, layout); - what do I make the div reference for insert






function optionChanged(value) {
    console.log(value)
}
    // once take in this value, use it to update information above which will be used to refresh the page

// d3.selectAll("#selDataset").on("change",updatePlotly)

// function updatePlotly() {
//     var dropDownMenu = d3.select("#selDataset");
//     var patientId = dropdownMenu.property("value");
// }

// }



// })
// }



