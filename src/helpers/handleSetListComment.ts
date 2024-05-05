import { IComment, IDisLikeFeedback, IDislikeComment, IFeedback, ILikeComment, ILikeFeedback, IListLimit } from "@/utils/interface";

export const handleSetListComments = (listComment : IListLimit<IComment> , listViewFeedback : number[]) : IComment[] =>{
    return listComment.items.map((item: IComment) => {
        return {
            ...item,
            isViewFeedback: listViewFeedback.includes(item.id) ? true : false,
            listUserLike: item.LikeComments.map(
                (itemChild: ILikeComment) => {
                    return itemChild.userId;
                }
            ),
            listUserDislike: item.DislikeComments.map(
                (itemChild: IDislikeComment) => {
                    return itemChild.userId;
                }
            ),
            Feedbacks: item.Feedbacks.map(
                (itemC: IFeedback, indexC: number) => {
                    return {
                        ...itemC,
                        listUserLike: itemC.LikeFeedbacks.map(
                            (im: ILikeFeedback) => {
                                return im.userId;
                            }
                        ),
                        listUserDislike: itemC.DislikeFeedbacks.map(
                            (im: IDisLikeFeedback) => {
                                return im.userId;
                            }
                        ),
                    };
                }
            ),
        };
    })
}
