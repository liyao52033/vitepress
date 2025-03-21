import { TkContentData } from "../../post/types";

export interface PostBaseInfoProps {
    post: TkContentData;
    scope: "home" | "article";
    split?: boolean;
}
