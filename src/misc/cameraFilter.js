export class CameraFilter {
  getDevices() {
    // Filter some devices, known to be bad choices.
    const deviceBlackList = [
      "OBS Virtual Camera",
      "OBS-Camera",
      "Desk View Camera",
      "Schreibtischansicht-Kamera",
      "Caméra Desk View",
      "Fotocamera di Panoramica Scrivania",
      "Rückseitige Ultra-Weitwinkelkamera",
      "Rückseitige Telefotokamera",
      "Rückseitige Dual-Weitwinkelkamera",
      "Rückseitige Triple-Kamera",
      "Back Dual Wide Camera",
      "Back Triple Camera",
      "Back Ultra Wide Camera",
      "Zadní ultra širokoúhlý fotoaparát",
      "Stolní kamera",
      "Ultrabrede camera aan voorzijde",
      "Front Ultra Wide Camera",
    ];

    return  navigator.mediaDevices.enumerateDevices().then((list)=>{
      return list.filter(({ kind }) => kind === "videoinput")
        .filter(({ label }) => !deviceBlackList.includes(label))
        .filter(({ label }) => !label.includes("infrared"));
    }).catch(()=>{
      return [];
    });
  }
}
