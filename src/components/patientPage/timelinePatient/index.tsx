import React, { useEffect, useState } from "react";

import { Icon, H3, Colors } from "@blueprintjs/core";
import { Card, Elevation } from "@blueprintjs/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

import "./style.css";

const TimelinePatient = () => {
  const [chart, setChart] = useState();

  useEffect(() => {
    // Initiate am chart if not defined
    if (!chart) {
      let chart = am4core.create(
        "timelineP",
        am4plugins_timeline.CurveChart
      ) as any;

      chart.curveContainer.padding(10, 10, 10, 10);
      chart.maskBullets = false;

      chart.data = [
        {
          start: "2017-01-10 06:00",
          end: "2017-01-10 06:00",
          title: "Fracture",
          type: "Diagnostic",
          color: "red"
        },
        {
          start: "2018-01-10 08:00",
          end: "2019-01-10 08:00",
          title: "AVC",
          type: "Diagnostic",
          color: "green"
        },
        {
          start: "2018-05-10 13:00",
          end: "2018-05-15 13:00",
          title: "Entorse",
          type: "Diagnostic",
          color: "blue"
        },
        {
          start: "2019-01-10 15:00",
          end: "2020-01-14 15:00",
          title: "Embolie plumonaire",
          type: "Diagnostic",
          color: "orange"
        },
        {
          start: "2020-01-14 15:00",
          end: "2020-01-14 15:00",
          title: "Décès",
          type: "Diagnostic",
          color: "black"
        }
      ];
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
      chart.dateFormatter.dateFormat = "MM-dd HH";

      chart.fontSize = 12;
      chart.tooltipContainer.fontSize = 12;

      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.disabled = true;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = { count: 1, timeUnit: "hour" };

      dateAxis.renderer.line.strokeDasharray = "1,4";
      dateAxis.renderer.line.strokeOpacity = 0.5;

      dateAxis.tooltip.background.cornerRadius = 2;
      dateAxis.tooltipDateFormat = "MMM dd";
      dateAxis.tooltip.background.fill = am4core.color(Colors.DARK_GRAY5);
      dateAxis.tooltip.background.strokeWidth = 0;
      dateAxis.tooltip.label.paddingTop = 7;

      dateAxis.extraMax = 0.01;
      dateAxis.extraMin = 0.01;
      dateAxis.max = Date.now();
      dateAxis.keepSelection = true;
      dateAxis.start = 0;
      dateAxis.end = 1;

      let labelTemplate = dateAxis.renderer.labels.template;
      labelTemplate.verticalCenter = "middle";
      labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
        "background"
      );
      labelTemplate.padding(7, 7, 7, 7);

      let series = chart.series.push(
        new am4plugins_timeline.CurveColumnSeries()
      );
      series.columns.template.height = am4core.percent(15);

      series.dataFields.openDateX = "start";
      series.dataFields.dateX = "end";
      series.dataFields.categoryY = "type";
      series.baseAxis = categoryAxis;

      series.columns.template.propertyFields.fill = "color"; // get color from data
      series.columns.template.propertyFields.stroke = "color";
      series.columns.template.strokeOpacity = 0.6;
      series.columns.template.fillOpacity = 0.6;
      series.columns.template.strokeWidth = 10;

      let imageBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
      imageBullet.locationX = 1;
      imageBullet.clickable = true;
      imageBullet.propertyFields.stroke = "color";
      imageBullet.background.propertyFields.fill = "color";
      imageBullet.propertyFields.opacity = 0.3;
      imageBullet.circle.radius = am4core.percent(50);
      imageBullet.dy = -5;
      imageBullet.events.on("hit", function(ev: any) {
        console.log(ev.target.dataItem.dataContext);
      });
      let textBullet = series.bullets.push(new am4charts.LabelBullet());
      textBullet.label.propertyFields.text = "title";
      textBullet.propertyFields.disabled = "textDisabled";
      textBullet.label.strokeOpacity = 0.3;
      textBullet.locationX = 1;
      textBullet.dy = -80;
      textBullet.label.textAlign = "middle";

      let cursor = new am4plugins_timeline.CurveCursor();
      chart.cursor = cursor;
      cursor.xAxis = dateAxis;
      cursor.yAxis = categoryAxis;
      cursor.lineY.disabled = true;
      cursor.lineX.strokeDasharray = "1,4";
      cursor.lineX.strokeOpacity = 1;

      dateAxis.renderer.tooltipLocation2 = 0;
      categoryAxis.cursorTooltipEnabled = false;

      setChart(chart);
    }
  }, [chart]);

  return (
    <Card elevation={Elevation.THREE} className="timeline">
      <H3>
        <Icon icon={"calendar"} /> Timeline
      </H3>
      {/* The timeline will be drawn by amcharts in the timelineP div */}
      <div className="timelineP"> </div>
    </Card>
  );
};

export default TimelinePatient;
