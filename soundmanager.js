class SoundManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = new Map();
        this.soundEffects = new Map();
    }

    queueDownload(name, path) {
        console.log("Queueing " + path);
        this.downloadQueue.set(name, path);
    }
    
    isDone() {
        return (
            this.downloadQueue.length === this.successCount + this.errorCount
        );
    }

    downloadAll() {
        //itterate through everythign in the map and add it in
        let that = this;
        for(let [key, value] of that.downloadQueue.entries()){
            that.soundEffects.set(key, new Audio(value));
            that.soundEffects.get(key).play();
        }  
        return true;
    }

    getSound(path) {
        return this.soundEffects.get(path);
    }

    autoRepeat(path){
        // this.soundEffects.get(path).addEventListener("ended", function() {
        //     this.currentTime = 0;
        //    this.play();
        // })
        this.soundEffects.get(path).loop = true;
    }
    setVolume(path, volume) {
        this.soundEffects.get(path).volume = volume;
    }

    setAllVolume(volume){
        for(let [key, value] of this.soundEffects.entries()){
            this.setVolume(key, volume);
        } 
    }
}
