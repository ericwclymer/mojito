var TransactionDateRange = (function(obj){
	var mainDivId = "mojitoTransactionRange";
	obj.initialize = function(){ 
		self.setHashObj();
		var target = document.getElementById('body-mint');
		var observer = new window.MutationObserver(function(mutations){
			if(!observer.accountTableLoaded){
				var accountTableEl = document.getElementById('account-table');
				if(accountTableEl){
					self.addElements();
					observer.disconnect();
					return;
				}
			}
		});
		observer.observe(target, { childList: true, subtree: true });
	}
	var self = {};
	self.mainDiv = undefined;
	self.hashObj = undefined;
	self.setHashObj = function(){
		var hash = location.hash;
		if(hash){
			var hashWithoutLocation = hash.substr(10);
			self.hashObj = JSON.parse(unescape(hashWithoutLocation));
		}
		else{
			self.hashObj = {};
		}
		return self.hashObj;
	}
	self.addClosedNotice = function(){
		var closedNoticeParent = document.createElement('div');
		closedNoticeParent.id = 'closedNoticeParent';
		var closedNotice = document.createElement('a');
		closedNotice.id = 'closedNotice';
		closedNotice.innerHTML = 'Open Mojito Date Filter';
		closedNotice.onclick = function(){
			self.mainDiv.setAttribute("class","");
			self.removeClosedNotice();
		};
		var accountTableEl = document.getElementById('account-table');
		accountTableEl.parentNode.insertBefore(closedNoticeParent, accountTableEl.nextElementSibling);
		closedNoticeParent.appendChild(closedNotice);
	};
	self.removeClosedNotice = function(){
		var closedNotice = document.getElementById('closedNotice');
		if(closedNotice){
			closedNotice.parentNode.removeChild(closedNotice);
		}
	};
	self.addElements = function(){
		var accountTableEl = document.getElementById('account-table');
		var parentDiv = document.createElement('div');
		parentDiv.id = mainDivId;
		self.mainDiv = parentDiv;
		var startInput = document.createElement('input');
		startInput.name = 'start';
		startInput.type = 'date';
		var startLabel = document.createElement('label');
		startLabel.setAttribute('for', 'start');
		startLabel.innerHTML = 'Start Date';
		var endInput = document.createElement('input');
		endInput.name= 'end';
		endInput.type = 'date';
		var endLabel = document.createElement('label');
		endLabel.setAttribute('for','end');
		endLabel.innerHTML = 'End Date';
		var submit = document.createElement('a');
		submit.innerHTML = 'Submit';
		submit.onclick = function(){
			self.addDates(self.formatAsMintDate(startInput.value), self.formatAsMintDate(endInput.value));
		}
		var closeButton = document.createElement('span');
		closeButton.id='close';
		closeButton.innerHTML = 'X';
		closeButton.onclick = function(){
			this.parentNode.setAttribute("class","clicked");
			self.addClosedNotice();
		};
		accountTableEl.parentNode.insertBefore(parentDiv, accountTableEl.nextElementSibling);
		parentDiv.appendChild(closeButton);
		parentDiv.appendChild(document.createElement("br"));
		parentDiv.appendChild(startLabel);
		parentDiv.appendChild(startInput);
		parentDiv.appendChild(document.createElement("br"));
		parentDiv.appendChild(endLabel);
		parentDiv.appendChild(endInput);
		parentDiv.appendChild(document.createElement("br"));
		parentDiv.appendChild(document.createElement("br"));
		parentDiv.appendChild(submit);
		
		if(self.hashObj.dateStart){
			startInput.value = self.formatAsHtml5Date(self.hashObj.dateStart);
		}
		if(self.hashObj.dateEnd){
			endInput.value = self.formatAsHtml5Date(self.hashObj.dateEnd);
		}
	}
	self.formatAsMintDate = function(html5DateValue){
		var dateObj = new Date(html5DateValue);
		return (dateObj.getUTCMonth()+1) + '/' + dateObj.getUTCDate() + '/' + dateObj.getUTCFullYear();
	}
	self.formatAsHtml5Date = function(stringDate){
		var dateArray = stringDate.split('/');
		var year = dateArray[2];
		var month = self.padMonthOrDay(dateArray[0]);
		var day = self.padMonthOrDay(dateArray[1]);
		var newDate = year+'-'+month+'-'+day;
		return newDate;
	}
	self.padMonthOrDay = function(n){
		return String("0" + n).slice(-2);
	}
	self.rebuildHashString = function(){
		if(!self.hashObj.offset){
			self.hashObj.offset = 0;
		}
		if(!self.hashObj.typeFilter){
			self.hashObj.typeFilter = 'cash';
		}
		if(!self.hashObj.typeSort){
			self.hashObj.typesort = 8;
		}
		self.hashString = 'location:'+escape(JSON.stringify(self.hashObj));
	}
	self.addDates = function(startDate, endDate){
		if(startDate){
			self.hashObj.dateStart = startDate;
		}
		if(endDate){
			self.hashObj.dateEnd = endDate;
		}
		self.rebuildHashString();
		location.hash = self.hashString;
	}
	return obj;
}(TransactionDateRange || {}));