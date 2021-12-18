import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import { Button } from "./Button";

const range = (start, stop, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PaginationBlock: FC<{
    onPageClick: (pageNo: number) => void;
    currentPageNo: number;
    totalPageNo: number;
    padding?: number;
    className?: string | ClassNames;
}> = ({
    onPageClick = () => {},
    currentPageNo = 1,
    totalPageNo = 10,
    padding = 3,
    className = ""
}) => {
    let startNo = currentPageNo - padding;
    let endNo = currentPageNo + padding;

    if (startNo < 1) {
        const offset = 1 - startNo;
        endNo = endNo + offset;
        startNo = 1;
    }
    if (endNo > totalPageNo) {
        const offset = endNo - totalPageNo;
        startNo = startNo - offset;
        endNo = totalPageNo;
        if (startNo < 1) {
            startNo = 1;
        }
    }
    const pageNumbers = range(startNo, endNo);
    const maxCurrentPageNo = currentPageNo === 1 ? 2 : currentPageNo;
    const minCurrentPageNo = currentPageNo === totalPageNo ? currentPageNo - 1 : currentPageNo;

    return (
        <div
            className={new ClassNames([
                "flex",
                "space-x-4",
                "justify-between sm:justify-start",
                "w-full"
            ])
                .add(className)
                .list()}
        >
            <div className="flex">
                <Button
                    className={new ClassNames(["hidden sm:flex", "sm:rounded-r-none"]).list()}
                    onClick={() => {
                        onPageClick(1);
                    }}
                >
                    First
                </Button>
                <Button
                    className={new ClassNames(["rounded sm:rounded-l-none"]).list()}
                    disabled={currentPageNo <= 1}
                    onClick={() => {
                        onPageClick(currentPageNo - 1);
                    }}
                >
                    Prev
                </Button>
            </div>

            <div className={new ClassNames(["flex", "space-x-2 sm:space-x-0"]).list()}>
                {pageNumbers.map((pageNo, index) => {
                    let isMobileVisible = true;

                    if (pageNo < minCurrentPageNo - 1 || pageNo > maxCurrentPageNo + 1) {
                        isMobileVisible = false;
                    }
                    return (
                        <Button
                            key={`pageNo-${pageNo}`}
                            onClick={() => onPageClick(pageNo)}
                            className={new ClassNames({
                                "bg-blue-500": currentPageNo === pageNo,
                                "sm:rounded-l-none": index > 0,
                                "sm:rounded-r-none": index < pageNumbers.length - 1,
                                "hidden sm:flex": !isMobileVisible
                            })
                                .add("w-12 justify-center")
                                .list()}
                        >
                            {pageNo}
                        </Button>
                    );
                })}
            </div>

            <div className="flex">
                <Button
                    className={new ClassNames(["sm:rounded-r-none"]).list()}
                    disabled={currentPageNo >= totalPageNo}
                    onClick={() => {
                        onPageClick(currentPageNo + 1);
                    }}
                >
                    Next
                </Button>
                <Button
                    className={new ClassNames(["hidden sm:flex", "rounded-l-none"]).list()}
                    onClick={() => {
                        onPageClick(totalPageNo);
                    }}
                >
                    Last
                </Button>
            </div>
        </div>
    );
};

export { PaginationBlock };
