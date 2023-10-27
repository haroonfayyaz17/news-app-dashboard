import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import * as storieAPI from "../../api/stories";
import { RenderIf } from "../../utils/common";
import formatDistance from "date-fns/formatDistance";

function Stories() {
  const { type } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async (type) => {
    setStories([]);
    setLoading(true);
    const stories = await storieAPI.fetchStories({ type });
    setLoading(false);
    setStories(stories?.data || []);
  };

  const getImageOpts = (data) => {
    const [multimedia] = data.multimedia || [];
    if (!multimedia) return;

    return { alt: multimedia.caption, src: multimedia.url };
  };

  const getFormatedDate = (date) =>
    formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    });
  useEffect(() => {
    fetchStories(type || "arts");
  }, []);

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <RenderIf
        isTrue={!loading}
        fallback={
          <Spinner
            style={{ height: "8rem", width: "8rem" }}
            className="text-center mt-5"
            color="info"
          ></Spinner>
        }
      >
        <RenderIf
          isTrue={stories.length}
          fallback={<h1 className="text-center mt-5">No Records Found</h1>}
        >
          {stories.map((data, idx) => (
            <RenderIf key={"__news__" + idx} isTrue={data.title}>
              <Card
                className="mt-3"
                style={{ minWidth: "70%", maxWidth: "70%" }}
              >
                <CardBody>
                  <div className="d-flex align-items-center p-4">
                    <div className="col-md-4 p-4">
                      <RenderIf isTrue={getImageOpts(data)}>
                        <CardImg
                          {...getImageOpts(data)}
                          style={{ height: 180 }}
                          top
                          width="100%"
                        />
                      </RenderIf>
                    </div>
                    <div className="col-md-8">
                      <a href={data.url} target="_blank">
                        <CardTitle tag="h5">{data.title}</CardTitle>
                      </a>
                      <CardText>{data.abstract}</CardText>
                      <CardText>
                        <small className="text-muted">
                          {getFormatedDate(data.published_date)}
                        </small>
                      </CardText>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </RenderIf>
          ))}
        </RenderIf>
      </RenderIf>
    </div>
  );
}

export default Stories;
