using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class Profile
    {
        public string Website;
        public string Phone_number;
        public List<MediaInfo> socialInfo;
        public List<MediaInfo> videoInfo;
        public List<MediaInfo> musicInfo;
        public List<MediaInfo> radioInfo;

        public void Commit(int id, IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository)
        {
            UserProfile profile = userProfileRepository.Find(id);
            AppSetup setup = appSetupRepository.Find(id);

            foreach (MediaInfo info in this.socialInfo)
            {
                switch (info.MediaType)
                {
                    case MediaType.FACEBOOK:
                        profile.Facebook = info.Username;
                        break;
                    case MediaType.TWITTER:
                        profile.Twitter = info.Username;
                        break;
                    case MediaType.INSTAGRAM:
                        profile.Instagram = info.Username;
                        break;
                    case MediaType.PERISCOPE:
                        profile.Periscope = info.Username;
                        break;
                    default:
                        break;
                }
            }

            foreach (MediaInfo info in this.musicInfo)
            {
                switch (info.MediaType)
                {
                    case MediaType.AUDIOMACK:
                        profile.AudioMack = info.Username;
                        break;
                    case MediaType.SOUNDCLOUD:
                        profile.SoundCloud = info.Username;
                        break;
                    case MediaType.MIXCLOUD:
                        profile.MixCloud = info.Username;
                        break;
                    case MediaType.PODOMATIC:
                        profile.Podomatic = info.Username;
                        break;
                    case MediaType.BLOGTALKRADIO:
                        profile.BlogTalkRadio = info.Username;
                        break;
                    default:
                        break;
                }

            }

            foreach (MediaInfo info in this.videoInfo)
            {
                switch (info.MediaType)
                {
                    case MediaType.YOUTUBE:
                        profile.YouTube = info.Username;
                        break;
                    case MediaType.VIMEO:
                        profile.Vimeo = info.Username;
                        break;
                    case MediaType.FLICKR:
                        profile.Flickr = info.Username;
                        break;
                    default:
                        break;
                }
            }

            foreach (MediaInfo info in this.radioInfo)
            {
                switch (info.MediaType)
                {
                    case MediaType.LISTENLIVE:
                        profile.ListenLive = info.Username;
                        break;
                    default:
                        break;
                }
            }

            profile.Website = this.Website;
            setup.Phone = this.Phone_number;

            userProfileRepository.Update(profile);
            appSetupRepository.Update(setup);
        }

        public static Profile Get(int id, IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository)
        {
            UserProfile userProfile = userProfileRepository.Find(id);
            AppSetup setup = appSetupRepository.Find(id);

            Profile profile = new Profile
            {
                Phone_number = setup.Phone == null ? "" : setup.Phone,
                Website = userProfile.Website == null ? "" : userProfile.Website
            };

            AddSocialInfo(profile, userProfile);
            AddMusicInfo(profile, userProfile);
            AddVideoInfo(profile, userProfile);
            AddRadioInfo(profile, userProfile);

            return profile;
        }

        private static void AddSocialInfo(Profile profile, UserProfile userProfile)
        {
            profile.socialInfo = new List<MediaInfo>();

            profile.socialInfo.Add(new MediaInfo
            {
                MediaType = MediaType.FACEBOOK,
                Username = userProfile.Facebook
            });

            profile.socialInfo.Add(new MediaInfo
            {
                MediaType = MediaType.TWITTER,
                Username = userProfile.Twitter
            });

            profile.socialInfo.Add(new MediaInfo
            {
                MediaType = MediaType.INSTAGRAM,
                Username = userProfile.Instagram
            });

            profile.socialInfo.Add(new MediaInfo
            {
                MediaType = MediaType.PERISCOPE,
                Username = userProfile.Periscope
            });
        }

        private static void AddMusicInfo(Profile profile, UserProfile userProfile)
        {
            profile.musicInfo = new List<MediaInfo>();

            profile.musicInfo.Add(new MediaInfo
            {
                MediaType = MediaType.AUDIOMACK,
                Username = userProfile.AudioMack
            });

            profile.musicInfo.Add(new MediaInfo
            {
                MediaType = MediaType.SOUNDCLOUD,
                Username = userProfile.SoundCloud
            });

            profile.musicInfo.Add(new MediaInfo
            {
                MediaType = MediaType.MIXCLOUD,
                Username = userProfile.MixCloud
            });

            profile.musicInfo.Add(new MediaInfo
            {
                MediaType = MediaType.PODOMATIC,
                Username = userProfile.Podomatic
            });

            profile.musicInfo.Add(new MediaInfo
            {
                MediaType = MediaType.BLOGTALKRADIO,
                Username = userProfile.BlogTalkRadio
            });
        }

        private static void AddVideoInfo(Profile profile, UserProfile userProfile)
        {
            profile.videoInfo = new List<MediaInfo>();

            profile.videoInfo.Add(new MediaInfo
            {
                MediaType = MediaType.YOUTUBE,
                Username = userProfile.YouTube
            });

            profile.videoInfo.Add(new MediaInfo
            {
                MediaType = MediaType.VIMEO,
                Username = userProfile.Vimeo
            });

            profile.videoInfo.Add(new MediaInfo
            {
                MediaType = MediaType.FLICKR,
                Username = userProfile.Flickr
            });
        }

        private static void AddRadioInfo(Profile profile, UserProfile userProfile)
        {
            profile.radioInfo = new List<MediaInfo>();

            profile.radioInfo.Add(new MediaInfo
            {
                MediaType = MediaType.LISTENLIVE,
                Username = userProfile.ListenLive
            });
        }
    }
}
