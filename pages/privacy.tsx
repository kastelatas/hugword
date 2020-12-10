import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {wrapper} from '@src/redux/store'
import {getNewsById} from '@src/redux/actions/news'
import {AccordionItemPanel} from 'react-accessible-accordion'
import {useRouter} from 'next/router'
import closeIcon from "../public/icons/close.svg";
import IconButton from "@src/components/Button/IconButton";

const Terms = () => {
  const router = useRouter()
  const currNews = useSelector(({news: {currNews}}) => currNews)
  const goBack = () => router.back()

  return (
    <div className="article">
      <IconButton close icon={closeIcon} onClick={goBack}/>

      {/*<div className="news-card__img">*/}
      {/*  <img src={`${process.env.API_IMG_URL}${currNews?.photo?.path}`} alt="news_img"/>*/}
      {/*</div>*/}
      {/*<div dangerouslySetInnerHTML={{__html: currNews?.content}}/>*/}

      <h2>Privacy</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
        felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
        eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
        dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
        rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque
        sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
        tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
        faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. <a href="#">Donec sodales sagittis magna.</a>
      </p>

      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Сonsectetuer adipiscing elit</li>
        <li>Aenean commodo ligula eget dolor</li>
      </ul>

      <p>
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
        felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
        fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
        justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
      </p>

      <ol>
        <li>Vivamus elementum semper nisi.</li>
        <li>Aenean vulputate eleifend tellus.</li>
        <li>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</li>
      </ol>
      <p>
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
        laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
      </p>

      <p>
        Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum
        rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
        pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
        venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla
        mauris sit amet nibh. Donec sodales sagittis magna.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
        felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
        eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
        dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
        rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque
        sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
        tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
        faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
      </p>

    </div>
  )
}

export default Terms
