import { BoutiqueMock, ClinicMock, HotelMock, InfluencerMock, JewelleryMock } from "../components/Mockups"

export const samplePreviews = [
  { id: "influencer", label: "Instagram influencer", url: "yourname.com", View: InfluencerMock },
  { id: "boutique", label: "Boutique", url: "theboutique.com", View: BoutiqueMock },
  { id: "clinic", label: "Clinic", url: "theclinic.com", View: ClinicMock },
  { id: "jewellery", label: "Jewellery shop", url: "thejeweller.com", View: JewelleryMock },
  { id: "hotel", label: "Hotel", url: "thehotel.com", View: HotelMock },
]

export function findSamplePreview(id: string | null) {
  return samplePreviews.find((item) => item.id === id) ?? null
}
