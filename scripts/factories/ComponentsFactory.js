export class ComponentsFactory {
    constructor() {}

    getTextfieldDOM = (textfieldName, isTextArea) => {
        const textfield = document.createElement("fieldset");
        textfield.classList.add("form-group");

        const label = document.createElement("label");
        label.classList.add("form-group__label");
        label.setAttribute("for", textfieldName);
        label.textContent = textfieldName;

        let input;

        if (isTextArea) {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", "text");
        }

        input.classList.add("form-group__textfield");
        input.id = textfieldName;
        input.setAttribute("name", textfieldName);
        input.setAttribute("placeholder", textfieldName);

        textfield.appendChild(label);
        textfield.appendChild(input);

        return textfield;
    };

    getLikeBtnDOM = (likes, isLiked) => {
        const button = document.createElement("button");
        button.classList.add("like-btn");

        const counter = document.createElement("p");
        counter.classList.add("like-btn__counter");
        counter.textContent = likes;

        const icon = document.createElement("i");
        icon.classList.add("like-btn__icon");

        if (isLiked) {
            icon.classList.add("like-btn__icon--liked");
            icon.addEventListener("click", unlike);
        } else {
            icon.addEventListener("click", like);
        }

        button.appendChild(counter);
        button.appendChild(icon);

        function unlike() {
            icon.removeEventListener("click", unlike);

            icon.classList.remove("like-btn__icon--liked");

            icon.addEventListener("click", like);
        }

        function like() {
            icon.removeEventListener("click", like);

            icon.classList.add("like-btn__icon--liked");

            icon.addEventListener("click", unlike);
        }

        return button;
    };

    getSortBtnDOM = () => {
        const sortBtn = document.createElement("ul");
        sortBtn.classList.add("sort-btn");

        const selectedContainer = document.createElement("li");
        const selected = document.createElement("button");
        selected.textContent = "Popularité";
        selectedContainer.classList.add("sort-btn__selected");

        selectedContainer.appendChild(selected);

        const icon = document.createElement("i");
        icon.classList.add("sort-btn__icon");

        selected.appendChild(icon);

        selectedContainer.addEventListener("click", openDropdown);

        const option1Container = document.createElement("li");
        const option1 = document.createElement("button");
        option1.textContent = "Date";
        option1Container.classList.add("sort-btn__option");
        option1Container.classList.add("sort-btn__option--hidden");

        option1Container.appendChild(option1);

        const option2Container = document.createElement("li");
        const option2 = document.createElement("button");
        option2.textContent = "Titre";
        option2Container.classList.add("sort-btn__option");
        option2Container.classList.add("sort-btn__option--hidden");

        option2Container.appendChild(option2);

        const options = [selectedContainer, option1Container, option2Container];

        sortBtn.appendChild(selectedContainer);
        sortBtn.appendChild(option1Container);
        sortBtn.appendChild(option2Container);

        function openDropdown() {
            selectedContainer.removeEventListener("click", openDropdown);

            icon.classList.add("sort-btn__icon--alt");
            option1Container.classList.remove("sort-btn__option--hidden");
            option2Container.classList.remove("sort-btn__option--hidden");

            options.forEach((option) => {
                option.addEventListener("click", closeDropdown);
            });
        }

        function closeDropdown(e) {
            options.forEach((option) => {
                option.removeEventListener("click", closeDropdown);
            });

            let filterChoosen = e.target.textContent;

            if (filterChoosen !== selected.textContent) {
                switch (filterChoosen) {
                    case option1.textContent:
                        option1.textContent = selected.textContent;
                        break;
                    case option2.textContent:
                        option2.textContent = selected.textContent;
                        break;
                    default:
                        break;
                }

                selected.textContent = filterChoosen;
                selected.appendChild(icon);
            }

            icon.classList.remove("sort-btn__icon--alt");
            option1Container.classList.add("sort-btn__option--hidden");
            option2Container.classList.add("sort-btn__option--hidden");

            selectedContainer.addEventListener("click", openDropdown);
        }

        return sortBtn;
    };

    getMainBtnDOM = (btnText) => {
        const btn = document.createElement("button");
        btn.textContent = btnText;
        btn.classList.add("btn");

        return btn;
    };

    getLogoDOM = () => {
        const logo = document.createElement("div");
        logo.classList.add("logo");

        const image = document.createElement("img");
        image.classList.add("logo__img");
        image.setAttribute("alt", "Logo FishEye");
        image.setAttribute("src", "./assets/images/logo.png");

        logo.appendChild(image);

        return logo;
    };

    getAvatarDOM = (userImage, userName, inCard) => {
        const avatar = document.createElement("div");
        avatar.classList.add("avatar");

        const image = document.createElement("img");
        image.classList.add("avatar__img");
        image.setAttribute("alt", `Avatar de ${userName}`);
        image.setAttribute("src", userImage);

        avatar.appendChild(image);

        if (inCard) {
            avatar.classList.add("avatar--card");
        }

        return avatar;
    };

    getUserNameDOM = (userName, inCard) => {
        const name = document.createElement("h2");
        name.classList.add("user-name");
        name.textContent = userName;

        if (inCard) {
            name.classList.add("user-name--card");
        }

        return name;
    };

    getUserLocationDOM = (userLocation, inCard) => {
        const location = document.createElement("p");
        location.classList.add("user-location");
        location.textContent = userLocation;

        if (inCard) {
            location.classList.add("user-location--card");
        }

        return location;
    };

    getUserTaglineDOM = (userTagline, inCard) => {
        const tagline = document.createElement("p");
        tagline.classList.add("user-tagline");
        tagline.textContent = userTagline;

        if (inCard) {
            tagline.classList.add("user-tagline--card");
        }

        return tagline;
    };

    getMediaDOM = (mediaPath, mediaTitle, likes, isLiked) => {
        const mediaContainer = document.createElement("figure");
        mediaContainer.classList.add("media-container");

        const media = document.createElement("img");
        media.classList.add("media-container__media");
        media.setAttribute("alt", mediaTitle);
        media.setAttribute("src", mediaPath);

        mediaContainer.appendChild(media);

        const figCaption = document.createElement("figcaption");
        figCaption.classList.add("media-container__figcaption");

        const title = document.createElement("p");
        title.textContent = mediaTitle;

        figCaption.appendChild(title);

        const likeBtn = this.getLikeBtnDOM(likes, isLiked);

        figCaption.appendChild(likeBtn);

        mediaContainer.appendChild(figCaption);

        return mediaContainer;
    };

    getUserCardDOM = (userImage, userName, userLocation, userTagline, userPrice) => {
        const userCard = document.createElement("article");
        userCard.classList.add("user-card");

        const avatar = this.getAvatarDOM(userImage, userName, true);
        const name = this.getUserNameDOM(userName, true);
        const location = this.getUserLocationDOM(userLocation, true);
        const tagline = this.getUserTaglineDOM(userTagline, true);

        const price = document.createElement("p");
        price.classList.add("user-card__price");
        price.textContent = `${userPrice}€/jour`;

        userCard.appendChild(avatar);
        userCard.appendChild(name);
        userCard.appendChild(location);
        userCard.appendChild(tagline);
        userCard.appendChild(price);

        return userCard;
    };

    getPhotographerHeaderDOM = (userImage, userName, userLocation, userTagline, btnText) => {
        const header = document.createElement("div");
        header.classList.add("photographer-header");

        const infos = document.createElement("div");
        infos.classList.add("photographer-header__infos");

        const name = this.getUserNameDOM(userName, false);
        const location = this.getUserLocationDOM(userLocation, false);
        const tagline = this.getUserTaglineDOM(userTagline, false);

        infos.appendChild(name);
        infos.appendChild(location);
        infos.appendChild(tagline);

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("photographer-header__btn-container");

        const button = this.getMainBtnDOM(btnText);

        btnContainer.appendChild(button);

        const avatarContainer = document.createElement("div");
        avatarContainer.classList.add("photographer-header__avatar-container");

        const avatar = this.getAvatarDOM(userImage, userName, true);

        avatarContainer.appendChild(avatar);

        header.appendChild(infos);
        header.appendChild(btnContainer);
        header.appendChild(avatarContainer);

        return header;
    };
}
