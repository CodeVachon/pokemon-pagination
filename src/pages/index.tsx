import React, { useState, useEffect } from "react";
import { PokemonCard, ErrorBlock, PaginationBlock } from "./../components";
import { ClassNames } from "@44north/classnames";
import { useQuery, gql } from "@apollo/client";
import type { IPokemonRecord } from "./../types";

const POKEMONQUERY = gql`
    query GetPokemon($pageNo: Int, $itemsPerPage: Int) {
        countPokemon
        listPokemon(pageNo: $pageNo, itemsPerPage: $itemsPerPage) {
            id
            name
            height
            weight
            stats {
                name
                base_stat
            }
            species {
                habitat {
                    name
                }
                color {
                    name
                }
            }
            sprites {
                official_artwork_front_default
            }
            types {
                name
            }
            abilities {
                name
                is_hidden
            }
        }
    }
`;

function Homepage() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [pageNo, setPageNo] = useState<number>(1);

    const { data, loading, error, refetch } = useQuery<{
        countPokemon: number;
        listPokemon: IPokemonRecord[];
    }>(POKEMONQUERY, {
        variables: {
            pageNo,
            itemsPerPage
        }
    });

    useEffect(() => {
        refetch({
            pageNo,
            itemsPerPage
        });
    }, [pageNo, itemsPerPage]);

    return (
        <div className={new ClassNames(["flex", "flex-col", "gap-6"]).list()}>
            {error && <ErrorBlock error={error} />}

            {loading ? (
                <p>I am Loading...</p>
            ) : (
                <>
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.listPokemon.map((record) => (
                            <li key={record.id}>
                                <PokemonCard data={record} />
                            </li>
                        ))}
                    </ul>
                    <PaginationBlock
                        onPageClick={(pageNo) => {
                            setPageNo(pageNo);
                        }}
                        currentPageNo={pageNo}
                        totalPageNo={Math.ceil(data.countPokemon / itemsPerPage)}
                    />
                </>
            )}
        </div>
    );
}

export default Homepage;
