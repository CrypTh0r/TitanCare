(function(){
  var Memory = {
    init: function(cards){
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");
      this.cardsArray = $.merge(cards, cards);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function(cardsArray){
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function(){
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.paused = false;
      this.guess = null;
      this.binding();
    },

    binding: function(){
      this.$memoryCards.on("click", $.proxy(this.cardClicked, this));
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },

    cardClicked: function(event){
      var _ = this;
      var $card = $(event.currentTarget);
      if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
        $card.find(".inside").addClass("picked");
        if(!_.guess){
          _.guess = $card.attr("data-id");
        } else if(_.guess == $card.attr("data-id") && !$card.hasClass("picked")){
          $(".picked").addClass("matched");
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function(){
            $(".picked").removeClass("picked");
            _.paused = false;
          }, 600);
        }
        if($(".matched").length == $(".card").length){
          _.win();
        }
      }
    },

    win: function(){
      this.paused = true;
      setTimeout(function(){
        Memory.showModal();
        Memory.$game.fadeOut(1000);  // Increased delay for smoother fade out
      }, 1500);
    },

    showModal: function(){
      this.$overlay.addClass("show");
      this.$modal.addClass("show");
    },

    hideModal: function(){
      this.$overlay.removeClass("show");
      this.$modal.removeClass("show");
    },

    reset: function(){
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

    shuffle: function(array){
      var counter = array.length, temp, index;
      while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function(){
      var frag = '';
      this.$cards.each(function(k, v){
        frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
        <div class="front"><img src="'+ v.img +'" alt="'+ v.name +'" /></div>\
        <div class="back"><img src="images/logo.png" alt="Titan Cards" /></div></div>\
        </div>';
      });
      return frag;
    }
  };

 var cards = [
		{
			name: "1",
			img: "images/1.png",
			id: 1,
		},
		{
			name: "2",
			img: "images/2.png",
			id: 2
		},
		{
			name: "3",
			img: "images/3.png",
			id: 3
		},
		{
			name: "4",
			img: "images/4.png",
			id: 4
		}, 
		{
			name: "5",
			img: "images/5.png",
			id: 5
		},
		{
			name: "6",
			img: "images/6.png",
			id: 6
		},
		{
			name: "7",
			img: "images/7.png",
			id: 7
		},
		{
			name: "8",
			img: "images/8.png",
			id: 8
		},
		{
			name: "9",
			img: "images/9.png",
			id: 9
		},
		{
			name: "10",
			img: "images/10.png",
			id: 10
		},
		{
			name: "11",
			img: "images/11.png",
			id: 11
		},
		{
			name: "12",
			img: "images/12.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();
