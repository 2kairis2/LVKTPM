import './Article.css'
import { ArticleData } from '../../common/json/ArticleData';
import { Link } from 'react-router-dom';

export default function Article(){
    return (
        <div className="article-component">
          <div className="container-content">
            <h1>Bài viết</h1>
          </div>
          <div className="container-img">
       {ArticleData.map(article => (
        <Link key={article.id} to={`/article/${article.id}`}>
          <img src={article.imagePath[0]} alt={`Article ${article.id}`} />
        </Link>
       ))}
          </div>
        </div>
      );
}