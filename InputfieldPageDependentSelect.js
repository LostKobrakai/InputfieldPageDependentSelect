$(document).ready(function() {
	$(".InputfieldPageDependentSelect").each(function() {

		var $t = $(this),
				$selects = $t.find("select"),
				$selected = $selects.find("option:selected"),
				$cache = $selects.clone();

		/**
		 *  Initialize the selectfields. If a value is selected only hide the ones,
		 *  which should not be visible.
		 *
		 */
		if($selected.length){
			var ids = $selected.map(function(){ 
				return parseInt($(this).val());
			}).toArray();

			$selects.not(":first").each(function(){
				$select = $(this);
				
				$select.find("option:not(:selected)").each(function(){
					var $op = $(this),
							id = parseInt($op.data("parent"));

					if(ids.indexOf(id) === -1 && $op.val().length > 0)
						$op.css("display", "none").prop("selected", false);
				});

				// Just for safari compatibility
				removeAllFieldsNotVisible($select);
			});
			
		}else{
			$selects.not(":first").each(function(){
				$select = $(this);

				$select.find("option").each(function(){
					$op = $(this);
					if($op.val().length > 0)
						$op.css("display", "none").prop("selected", false);
				});

				// Just for safari compatibility
				removeAllFieldsNotVisible($select);
			});
		}

		/**
		 *  Update the selectfields on changes
		 *  
		 *
		 */
		$selects.not(":last").on("change", function(e){
			var $t = $(this),
					id = parseInt($t.val()),
					index = $selects.index($t);

			$selects.filter(":gt("+index+")").each(function(){
				var $select = $(this),
						index = $selects.index($select);

				// Just for safari compatibility
				$select.children().remove();
				$select.append($cache.eq(index).children().clone());
				// end 

				$select.find("option").each(function(){
					var $op = $(this);
					$op.prop("selected", false);

					if($op.val().length > 0){
						if($op.data("parent") == id)
							$op.css("display", "block");
						else{
							$op.css("display", "none");
							$op.prop("selected", false);
						}
					}
				});

				// Just for safari compatibility
				removeAllFieldsNotVisible($select);
			});
		});

		function removeAllFieldsNotVisible($ele){
			if($ele.is("select")){
				$ele.find("option").filter(function(){
					return $(this).css("display") == "none" ? true : false;
				}).remove();
			}
		}
	}); 
}); 