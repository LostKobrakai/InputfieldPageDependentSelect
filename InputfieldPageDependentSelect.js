$(document).ready(function() {
	$(".InputfieldDependentSelect").each(function() {

		var $t = $(this),
				$selects = $t.find("select"),
				$selected = $selects.find("option:selected");

		/**
		 *  Initialize the selectfields. If a value is selected only hide the ones,
		 *  which should not be visible.
		 *
		 */
		if($selected.length){
			var ids = $selected.map(function(){ return $(this).val(); }).toArray();

			$selects.not(":first").find("option:not(:selected)").each(function(){
				var $op = $(this),
						id = parseInt($op.data("parent"));
				if(ids.indexOf(id) === -1 && $op.val()) $op.css("display", "none").prop("selected", false);
			});

		}else{
			$selects.not(":first").find("option").each(function(){
				$op = $(this);
				if($op.val()) $op.css("display", "none").prop("selected", false);
			});
		}

		/**
		 *  Update the selectfields on changes
		 *  
		 *
		 */
		$selects.not(":last").on("change", function(e){
			var $t = $(this),
					id = parseInt($t.val());

			$selects.filter(":gt("+$selects.index($t)+")").find("option").each(function(){
				var $op = $(this);

				if($op.val()){
					if($op.data("parent") == id) $op.css("display", "block");
					else{
						$op.css("display", "none");
						$op.prop("selected", false);
					}
				}
			});
		});



	}); 
}); 