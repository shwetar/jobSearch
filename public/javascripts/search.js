$(".search").on("click", function(ev){
    ev.preventDefault();
    
	$.get( "/listings/search", { title: $("#title").val(), location: $("#location").val() } )
      .done(function( data ) {
        console.log( "Data Loaded: " + data );
        $('#listTable').show();
        renderListingData(data);
    });

});

function renderListingData(data){
	var listingTemplate = "<% listItems.forEach(function(item) { %>"+
          "<tr>" +
              "<td><%= item.title %></td>"+
              "<td><%= item.location %></td>"+
              "<td><%= item.description %></td>"+
            "</tr>"+
          "<%});%>";
	var html=ejs.render(listingTemplate,{listItems:data});
	console.log(html);
	$('#myTable').html(html);


}