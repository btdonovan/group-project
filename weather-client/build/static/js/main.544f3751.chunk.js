(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{13:function(e,t,a){e.exports=a(24)},18:function(e,t,a){},20:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(12),o=a.n(r),i=(a(18),a(3)),c=a.n(i),l=a(5),h=a(6),u=a(7),m=a(1),d=a(8),f=a(9),p=(a(4),a(20),a(2)),v=a.n(p),g=function(e){Object(f.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={forecast:{}},e}return Object(u.a)(a,[{key:"fetchForecast",value:function(){var e=Object(l.a)(c.a.mark((function e(t,a){var n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://yellowstone-weather.herokuapp.com/getForecast/".concat(t,"/").concat(a)).then((function(e){return e.json()})).then((function(e){n.setState({forecast:e})}));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t;Object.keys(this.state.forecast).length||this.fetchForecast(this.props.location_id,this.props.date),this.props.date!==this.state.forecast.date&&this.fetchForecast(this.props.location_id,this.props.date);var a,n="\u2103";this.props.fahrenheit?(e=(1.8*Number(this.state.forecast.high_temp)+32).toFixed(1),t=(1.8*Number(this.state.forecast.low_temp)+32).toFixed(1),n="\u2109"):(e=Number(this.state.forecast.high_temp),t=Number(this.state.forecast.low_temp));var r,o="meters";this.props.feet?(a=(a=3.28084*this.state.forecast.altitude).toFixed(1),o="feet"):a=this.state.forecast.altitude;var i=this.state.forecast.visibility,c=this.state.forecast.phase;0===c?r="new_moon":1===c?r=i<15?"waxing_10":i<25?"waxing_20":i<35?"waxing_30":"waxing_40":2===c?r="first_qtr_moon":3===c?r=i<65?"waxing_60":i<75?"waxing_70":i<85?"waxing_80":"waxing_90":4===c?r="full_moon":5===c?r=i>=85?"waning_90":i>=75?"waning_80":i>=65?"waning_70":"waning_60":6===c?r="third_qtr_moon":7===c&&(r=i>=35?"waning_40":i>=25?"waning_30":i>=15?"waning_20":"waning_10");var l,h=this.state.forecast.date,u=this.state.forecast.sunrise,m=this.state.forecast.sunset,d=this.state.forecast.moonrise,f=this.state.forecast.moonset,p=this.state.forecast.timezone;return h&&(u=(u=v()(new Date(Date.parse(u))).tz(p)).format("h:mm A z"),m=(m=v()(new Date(Date.parse(m))).tz(p)).format("h:mm A z"),d=(d=v()(new Date(Date.parse(d))).tz(p)).format("h:mm A z"),f=(f=v()(new Date(Date.parse(f))).tz(p)).format("h:mm A z")),l=this.state.forecast.precip>=80?"rainy.svg":this.state.forecast.precip>=50?"drizzle.svg":this.state.forecast.cloud_cover>=80?"cloudy.svg":this.state.forecast.cloud_cover>=60?"mostly_cloudy.svg":this.state.forecast.cloud_cover>=30?"partly_cloudy.svg":"sunny.svg",this.props.startDate?s.a.createElement("div",{className:"card mb-4 shadow"},s.a.createElement("div",{className:"card-header text-white bg-dark"},h," - ",this.state.forecast.name),s.a.createElement("div",null,s.a.createElement("div",{className:"img-overlay-container"},s.a.createElement("img",{src:"/images/".concat(l),alt:l,width:"100%"}),s.a.createElement("div",{className:"card-img-overlay card-body text-white bg-dark"},s.a.createElement("div",{className:"card-text"},"Altitude: ",a," ",o),s.a.createElement("div",{className:"card-text"},"Lat: ",this.state.forecast.lat," Lon: ",this.state.forecast.lon),s.a.createElement("div",{className:"card-text"},this.state.forecast.description),s.a.createElement("div",{className:"card-text"},"Cloud Cover: ",this.state.forecast.cloud_cover,"%"),s.a.createElement("div",{className:"card-text"},"Chance of Rain: ",this.state.forecast.precip,"%"),s.a.createElement("div",{className:"card-text"},"Sunrise: ",u),s.a.createElement("div",{className:"card-text"},"Sunset: ",m),s.a.createElement("div",{className:"card-text"},"Moonrise: ",d),s.a.createElement("div",{className:"card-text"},"Moonset: ",f)))),s.a.createElement("div",{className:"card-footer text-white bg-dark"},"High: ",e,n," - Low: ",t,n," ",s.a.createElement("img",{className:"float-right",src:"/images/"+r+".png",alt:r+" phase",width:"30px"}))):s.a.createElement("div",null)}}]),a}(s.a.PureComponent);var E=function(e){return 0===e.routes.length?s.a.createElement("div",null,"Waiting..."):s.a.createElement("form",null,s.a.createElement("label",{htmlFor:"routes"},"Choose a route:"),s.a.createElement("select",{name:"routes",onChange:e.handleRouteChange},s.a.createElement("option",null),s.a.createElement("option",{value:1},e.routes[0].name),s.a.createElement("option",{value:2},e.routes[1].name),s.a.createElement("option",{value:3},e.routes[2].name)))};var w=function(e){if(0===e.stops)return s.a.createElement("div",null,"Waiting...");var t;t=6-e.stops;for(var a=[],n=0;n<=t;n++)a.push("2020-07-".concat(11+n));return s.a.createElement("form",null,s.a.createElement("label",{htmlFor:"dates"},"Choose a start date:"),s.a.createElement("select",{name:"dates",onChange:e.handleDateChange,value:""},s.a.createElement("option",null,e.initial||""),a.map((function(e,t){return s.a.createElement("option",{key:t,value:e},e)}))))};var b=function(e){return s.a.createElement("form",null,s.a.createElement("input",{type:"checkbox",name:"temp",onChange:e.handleTempChange}),s.a.createElement("label",{htmlFor:"temp"},"Fahrenheit"),s.a.createElement("br",null),s.a.createElement("input",{type:"checkbox",name:"dist",onChange:e.handleDistChange}),s.a.createElement("label",{htmlFor:"dist"},"Feet"))},C=function(e){Object(f.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={fahrenheit:!1,feet:!1,route:0,routes:[],stops:[],dates:[]},n.fetchRoutes=n.fetchRoutes.bind(Object(m.a)(n)),n.handleRouteChange=n.handleRouteChange.bind(Object(m.a)(n)),n.handleDateChange=n.handleDateChange.bind(Object(m.a)(n)),n.handleTempChange=n.handleTempChange.bind(Object(m.a)(n)),n.handleDistChange=n.handleDistChange.bind(Object(m.a)(n)),n}return Object(u.a)(a,[{key:"fetchRoutes",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://yellowstone-weather.herokuapp.com/routes").then((function(e){return e.json()})).then((function(e){t.setState({routes:e})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"handleRouteChange",value:function(e){if(e.target.value){var t=e.target.value-1,a=[this.state.routes[t].stop1,this.state.routes[t].stop2,this.state.routes[t].stop3,this.state.routes[t].stop4];a=a.filter((function(e){return Boolean(e)})),this.setState({route:e.target.value,stops:a,startDate:void 0})}}},{key:"handleDateChange",value:function(e){this.setState({startDate:e.target.value,dates:this.state.stops.map((function(t,a){return v()(e.target.value).tz("UTC").add(a,"days").format("YYYY-MM-DD")}))})}},{key:"handleTempChange",value:function(){this.setState({fahrenheit:!this.state.fahrenheit})}},{key:"handleDistChange",value:function(){this.setState({feet:!this.state.feet})}},{key:"render",value:function(){var e=this;0===this.state.routes.length&&this.fetchRoutes();var t=0;return this.state.stops&&(t=this.state.stops.length),s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"col-md-12"},s.a.createElement("div",null,s.a.createElement(E,{handleRouteChange:this.handleRouteChange,routes:this.state.routes})),s.a.createElement("div",null,s.a.createElement(w,{handleDateChange:this.handleDateChange,stops:t,initial:this.state.startDate})),s.a.createElement("div",null,s.a.createElement(b,{handleTempChange:this.handleTempChange,handleDistChange:this.handleDistChange})),this.state.dates.map((function(t,a){return s.a.createElement(g,{key:a,location_id:e.state.stops[a],fahrenheit:e.state.fahrenheit,feet:e.state.feet,startDate:e.state.startDate,date:t})}))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.544f3751.chunk.js.map