const epochs = {
  epochs: [],
  measureEra: function() {
    if (this.epochs.length === 0) {
      return undefined;
    }
    let startYear = this.epochs[0].startYear,
        endYear = this.epochs[0].endYear;
    this.epochs.forEach(function(epoch){
      startYear = epoch.startYear < startYear ? epoch.startYear : startYear;
      endYear = epoch.endYear > endYear ? epoch.endYear : endYear;
    });
    return [startYear, endYear];
  },
  addEpoch: function(epoch) {
    this.epochs.push(epoch);
    this.epochs.sort((a, b) => a.startYear - b.startYear)
  },
  updateEpochsView: function() {
    let startYear = this.epochs[0].startYear,
        epochContainer = document.getElementById('epochs'),
        epochOffset,
        epochLength;
    let addCell = (cellType) => {
      let div = document.createElement('div');
      div.className = cellType;
      epochContainer.appendChild(div);
    };
    addCell('epoch-label');
    addCell('epoch');
    let epochLabels = document.getElementsByClassName('epoch-label'),
        epochVisuals = document.getElementsByClassName('epoch');
    for (let r = 0; r < this.epochs.length; r++) {
      for (let c = 0; c <= 1; c++) {
        switch (c) {
          case 0:
            epochLabels[r].innerHTML = this.epochs[r].name;
            break;
          case 1:
            epochOffset = this.epochs[r].startYear - startYear;
            epochLength = this.epochs[r].endYear - this.epochs[r].startYear;
            epochVisuals[r].style = `margin-left: ${epochOffset}px; width: ${epochLength}px;`;
            break;
        }
      }
    }
  }
}
