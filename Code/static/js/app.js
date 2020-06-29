d3.json("samples.json").then((data) => {

  console.log(data)

  // fill in drop down menu
  d3.select("#selDataset").selectAll("option")
      .data(data.names)
      .enter()
      .append("option")
      .attr("value", d => d)
      .text(d => d);
  
  // get the patient ID from the drop down menu and update page
  d3.selectAll("#selDataset").on("change", updatePatientId);
  // Create a function to handle the event
  function updatePatientId () {
    var patientId = d3.select("#selDataset").property("value")
      console.log(patientId)
      // plot graphs and update chart
      plotBar(patientId);
      plotBubble(patientId);
      plotFrequencyChart(patientId);
      populateDemographicInfo(parseInt(patientId));
  }   
   
  // function to get data for patient demographic chart and graphs
  function filterData(selectedId) {
    var metaData = data.metadata
    var samples = data.samples
           
    console.log(metaData)
    console.log(samples)
    
    var patientIdMetaData = metaData.filter(d => d.id == selectedId)
    var patientWfreq = patientIdMetaData[0].wfreq

    console.log(patientIdMetaData)
    console.log(`Filtered Patient’s Ethnicity: ${patientIdMetaData[0].ethnicity}`); 
  
    // Get patient sample data
    var patientIdSampleData = samples.filter(d => d.id == selectedId)
    var patientIdOtuIds = patientIdSampleData[0].otu_ids
    var patientId10OtuIds = patientIdOtuIds.slice(0, 10).reverse()
    var patientIdSampleValues = patientIdSampleData[0].sample_values
    var patientId10SampleValues = patientIdSampleValues.slice(0, 10).reverse()
    var patientIdSampleOtuLabels = patientIdSampleData[0].otu_labels
    var patientId10SampleOtuLabels = patientIdSampleOtuLabels.slice(0, 10).reverse()

    // add "OTU" to each otu id for patient
    var otuIdBar = patientId10OtuIds.map(d => `OTU ID: ${d}`)
    return ([patientId10OtuIds, otuIdBar, patientId10SampleValues, patientId10SampleOtuLabels, patientIdOtuIds, patientIdSampleValues, patientIdSampleOtuLabels, patientWfreq])
    }

    // function to create bar chart
    function plotBar(selectedId) {
 
      var trace1 = {
        x: filterData(selectedId)[2],
        y: filterData(selectedId)[1],
        text: filterData(selectedId)[3],
        type: "bar",
        orientation: "h"    
        };
      // data
      var dataBar = [trace1];
      // Apply the group bar mode to the layout
      var layoutBar = {
        title: "Bar Chart of Top 10 OTU's for selected Patient",
        xaxis: {title: "Values - Operational Taxonomic Units"},
        // yaxis: {title: "Operational Taxonomic Units (OTU)"},
        height: 500,
        width: 550,
        margin: {
          l: 150,
          r: 100,
          t: 100,
          b: 100
        }
      };
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", dataBar, layoutBar);
    };

    // function to plot frequency chart
    function plotFrequencyChart(selectedId) {
      // plot
      var trace3 = {
          domain: { x: [0, 1], y: [0, 1] },
          value: filterData(selectedId)[7],
          title: { text: "Weekly Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: 'rgba(245,11,11,.7)' },
              { range: [1, 2], color: 'rgba(245,112,11,.7)' },
              { range: [2, 3], color: 'rgba(245, 198, 11,.7)' },
              { range: [3, 4], color: 'rgba(245, 229, 11,.7)' },
              { range: [4, 5], color: 'rgba(213, 245, 11,.7)' },
              { range: [5, 6], color: 'rgba(182, 245, 11,.7)' },
              { range: [6, 7], color: 'rgba(151, 245, 11,.7)' },
              { range: [7, 8], color: 'rgba(89, 245, 11,.7)' },
              { range: [8, 9], color: 'rgba(11, 245, 89,.7)' },
            ]
          }
        }
      data
      var dataFrequency = [trace3];      
      // define the layout
      var layoutFrequency = {
          height: 450,
          width: 500,
          margin: {
            t: 0,
            b: 0
            }
          };
      // Render the plot to the div tag with id "gauge"
      Plotly.newPlot("gauge", dataFrequency, layoutFrequency);    
    };
  
    // function to plot bubble chart
    function plotBubble(selectedId) {
      // plot
      var trace2 = {
          x: filterData(selectedId)[4], 
          y: filterData(selectedId)[5],
          text: filterData(selectedId)[6],
          mode: "markers",
          marker: {
              size: filterData(selectedId)[5],
              color: filterData(selectedId)[4],
              opacity: 0.5
          }
      };
      // data
      var dataBubble = [trace2];
      // Apply the group bar mode to the layout
      var layoutBubble = {
          title: "Bubble Chart of OTU's for Selected Patient",
          xaxis: {title: "OTU ID"},
          yaxis: {title: "Sample values"},
          height: 800,
          width: 1150,
          margin: {
              l: 50,
              r: 50,
              t: 100,
              b: 100
          }
      };
      // Render the plot to the div tag with id "bubble"
      Plotly.newPlot("bubble", dataBubble, layoutBubble);
    }     

    // function to populate demographic info
    function populateDemographicInfo(selectedId) {
      // retrieve metadata
      var metadata= data.metadata
      // remove all info in demographic panel if exists
      d3.selectAll(".panel-body > h5").remove()
      // filter metadata according to chosen id
      var filteredMetadata= metadata.filter(d => d.id === selectedId)[0]
      // get key-value pairs and add them to the demographic info panel
      Object.entries(filteredMetadata).forEach(function([key, value]) {
        d3.selectAll(".panel-body").append("h5").html("<strong>" + key + ": " + value + "<strong>");
        });
      };          
// -------------------------------------------
// FUNCTION TO INITIALIZE
function init() {
  plotBar("940");
  plotBubble("940");
  plotFrequencyChart("940")
  populateDemographicInfo(940);
}
// call function to initialize
init();
});