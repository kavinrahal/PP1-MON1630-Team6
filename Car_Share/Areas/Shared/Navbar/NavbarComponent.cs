using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarShare.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using CarShare.Areas.Identity.Data;

namespace ViewComponentDemo.ViewComponents
{
    // could get away with a partialview for this, but wanted to try the viewcomponent idea

    [ViewComponent(Name = "Navbar")]
    public class RecentArticlesViewComponent : ViewComponent
    {
        private readonly UserManager<User> _userManager;

        public RecentArticlesViewComponent(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            List<string> userRole = new();
            if (User.Identity.IsAuthenticated)
            {
                User currentUser = await _userManager.GetUserAsync(HttpContext.User);
                userRole = (List<string>)await _userManager.GetRolesAsync(currentUser);
            }
            return View("~/Areas/Shared/Navbar/Default.cshtml", 
                userRole.FirstOrDefault());
        }
    }
}
