import { Controller, Get, Param, Query } from "@nestjs/common";
import data from "../../data/parcels.mock.json";
import type { SearchResponse, ParcelDetailsResponse } from "@satya/types";

@Controller("parcels")
export class ParcelsController {
  @Get("search")
  search(
    @Query("q") q?: string,
    @Query("survey_no") survey_no?: string,
    @Query("layout_name") layout_name?: string,
    @Query("door_no") door_no?: string
  ): SearchResponse {
    const norm = (s?: string) => (s||"").toLowerCase();
    const fuse = norm(q);
    const items = (data as any[]).filter((p) => {
      const f = p.facts || {};
      const hay = [f.survey_no, f.layout_name, f.door_no, f.village, f.mandal, f.district, f.state]
        .filter(Boolean).map(norm).join(" ");
      const qOk = fuse ? hay.includes(fuse) : true;
      const sOk = survey_no ? norm(f.survey_no) === norm(survey_no) : true;
      const lOk = layout_name ? norm(f.layout_name)?.includes(norm(layout_name)) : true;
      const dOk = door_no ? norm(f.door_no) === norm(door_no) : true;
      return qOk && sOk && lOk && dOk;
    });
    return { items };
  }

  @Get(":id")
  byId(@Param("id") id: string): ParcelDetailsResponse {
    const item = (data as any[]).find((p) => p.id === id);
    if (!item) throw new Error("Not Found");
    return {
      ...item,
      documents: [
        { id: "doc_ec_"+id, title: "Encumbrance Certificate", access: "public" },
        { id: "doc_lp_"+id, title: "Layout Approval (LP)", access: "public" },
        { id: "doc_cc_"+id, title: "Completion Certificate", access: "fee" },
        { id: "doc_vig_"+id, title: "Vigilance Note", access: "confidential" }
      ],
      provenance: [
        { fact: "Zoning: Residential", source: "UDA Master Plan", date: "2024-11-10" },
        { fact: "EC fetched", source: "Registration Dept", date: "2025-01-02" }
      ]
    };
  }
}
